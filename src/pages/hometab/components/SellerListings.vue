<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { useAuthUserStore } from "@/stores/authUser";
import { extractListingFromImage } from "@/lib/AiBase";
import { useListingsDataStore } from "@/stores/listingsData";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const authStore = useAuthUserStore();
const listingsStore = useListingsDataStore();

const isSubmitting = ref(false);
const isDragActive = ref(false);
const imageFile = ref<File | null>(null);
const imagePreviewUrl = ref<string | null>(null);
const dropzoneInput = ref<HTMLInputElement | null>(null);
const isAnalyzing = ref(false);
const aiError = ref<string | null>(null);
const aiInsights = ref<string[]>([]);
const aiPriceReason = ref<string | null>(null);
const priceFallbackUsed = ref(false);

const mapContainer = ref<HTMLDivElement | null>(null);
const isMapReady = ref(false);
const locationError = ref<string | null>(null);
const latitude = ref<number>(10.3157);
const longitude = ref<number>(123.8854);
let mapInstance: L.Map | null = null;
let locationMarker: L.Marker | null = null;

const form = ref({
  title: "",
  type: "",
  description: "",
  price: null as number | null,
  quality: "",
  status: "active",
});

const sellerId = computed(() => authStore.userData?.id || null);

const mapCenter = computed(
  () => [latitude.value, longitude.value] as [number, number],
);

const formattedPrice = computed(() => {
  if (form.value.price === null) {
    return "";
  }

  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(form.value.price);
});

const resetForm = () => {
  form.value = {
    title: "",
    type: "",
    description: "",
    price: null,
    quality: "",
    status: "active",
  };
  aiInsights.value = [];
  aiError.value = null;
  aiPriceReason.value = null;
  priceFallbackUsed.value = false;
  imageFile.value = null;
  if (imagePreviewUrl.value) {
    URL.revokeObjectURL(imagePreviewUrl.value);
  }
  imagePreviewUrl.value = null;
};

const fileToDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read image."));
    reader.readAsDataURL(file);
  });

const applyAiResult = (result: {
  title: string;
  description: string;
  type: string;
  quality: string;
  suggestedPrice: number | null;
  priceReason: string;
  reusableBiowaste: string[];
}) => {
  const pickText = (current: string, next: string) =>
    current.trim() ? current : next.trim();

  form.value.title = pickText(form.value.title, result.title || "");
  form.value.type = pickText(form.value.type, result.type || "");
  form.value.description = pickText(
    form.value.description,
    result.description || "",
  );
  form.value.quality = pickText(form.value.quality, result.quality || "");
  if (form.value.price === null && typeof result.suggestedPrice === "number") {
    form.value.price = result.suggestedPrice;
  }
  aiInsights.value = result.reusableBiowaste || [];
  aiPriceReason.value = result.priceReason?.trim() || null;
};

const normalizePrice = () => {
  if (form.value.price === null) {
    return;
  }

  if (!Number.isFinite(form.value.price)) {
    form.value.price = 0;
    priceFallbackUsed.value = true;
  }
};

const analyzeImage = async (file: File) => {
  isAnalyzing.value = true;
  aiError.value = null;
  aiInsights.value = [];
  aiPriceReason.value = null;
  priceFallbackUsed.value = false;
  aiPriceReason.value = null;

  try {
    const dataUrl = await fileToDataUrl(file);
    const result = await extractListingFromImage(dataUrl);
    if (!result) {
      aiError.value =
        "AI analysis is unavailable. Check the VITE_GROQ_API_KEY setup.";
      return;
    }

    applyAiResult(result);
  } catch (error) {
    aiError.value =
      error instanceof Error ? error.message : "Failed to analyze image.";
  } finally {
    isAnalyzing.value = false;
  }
};

const handleFile = (file?: File | null) => {
  if (!file) {
    return;
  }

  if (!file.type.startsWith("image/")) {
    return;
  }

  imageFile.value = file;
  if (imagePreviewUrl.value) {
    URL.revokeObjectURL(imagePreviewUrl.value);
  }
  imagePreviewUrl.value = URL.createObjectURL(file);
  void analyzeImage(file);
};

const handleDrop = (event: DragEvent) => {
  event.preventDefault();
  isDragActive.value = false;
  const file = event.dataTransfer?.files?.[0];
  handleFile(file || null);
};

const handleDragOver = (event: DragEvent) => {
  event.preventDefault();
  isDragActive.value = true;
};

const handleDragLeave = () => {
  isDragActive.value = false;
};

const triggerFilePicker = () => {
  dropzoneInput.value?.click();
};

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  handleFile(file || null);
};

watch(
  () => form.value.price,
  (value) => {
    if (value !== null && Number.isFinite(value)) {
      priceFallbackUsed.value = false;
    }
  },
);

const createListing = async () => {
  if (!sellerId.value) {
    return;
  }

  isSubmitting.value = true;

  try {
    let uploadedImagePath: string | null = null;
    if (imageFile.value) {
      if (typeof listingsStore.uploadListingImage !== "function") {
        aiError.value =
          "Image upload is unavailable. Please restart the dev server.";
        return;
      }

      const uploadResult = await listingsStore.uploadListingImage(
        imageFile.value,
        sellerId.value,
      );

      if (!uploadResult) {
        aiError.value = "Image upload failed. Please try again.";
        return;
      }

      uploadedImagePath = uploadResult.path;
    }

    await listingsStore.createListing({
      seller_id: sellerId.value,
      title: form.value.title || null,
      type: form.value.type || null,
      description: form.value.description || null,
      price: form.value.price ?? null,
      quality: form.value.quality || null,
      status: form.value.status || null,
      image_url: uploadedImagePath,
    });

    resetForm();
  } finally {
    isSubmitting.value = false;
  }
};

const initMap = () => {
  if (!mapContainer.value) {
    return;
  }

  mapInstance = L.map(mapContainer.value, {
    zoomControl: true,
  }).setView(mapCenter.value, 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(mapInstance);

  locationMarker = L.marker(mapCenter.value).addTo(mapInstance);
  isMapReady.value = true;
};

const updateMapLocation = () => {
  if (!mapInstance || !locationMarker) {
    return;
  }

  locationMarker.setLatLng(mapCenter.value);
  mapInstance.setView(mapCenter.value, mapInstance.getZoom());
};

const loadLocation = () => {
  if (!navigator.geolocation) {
    locationError.value = "Geolocation is not supported by this browser.";
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      latitude.value = position.coords.latitude;
      longitude.value = position.coords.longitude;
      locationError.value = null;
      updateMapLocation();
    },
    () => {
      locationError.value = "Unable to access your location.";
    },
  );
};

onMounted(() => {
  initMap();
  loadLocation();
});

onUnmounted(() => {
  if (mapInstance) {
    mapInstance.remove();
    mapInstance = null;
  }

  if (imagePreviewUrl.value) {
    URL.revokeObjectURL(imagePreviewUrl.value);
  }
});
</script>

<template>
  <v-card class="pa-6" variant="outlined">
    <div class="text-h6 font-weight-bold mb-1">Create New Listing</div>
    <div class="text-body-2 text-medium-emphasis mb-4">
      Add new listings and attach a photo. Location is pulled from your device.
    </div>
    <v-card
      variant="outlined"
      class="pa-6 mt-2 mb-4 cursor-pointer transition-colors"
      :class="{ 'bg-primary-lighten-4': isDragActive }"
      @click="triggerFilePicker"
      @drop="handleDrop"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
    >
      <input
        ref="dropzoneInput"
        type="file"
        accept="image/*"
        class="d-none"
        @change="handleFileChange"
      />
      <v-img
        v-if="imagePreviewUrl"
        :src="imagePreviewUrl"
        height="180"
        cover
        class="rounded-lg"
      />
      <div
        v-else
        class="d-flex flex-column align-center justify-center text-center"
      >
        <v-icon size="36" class="mb-2">mdi-cloud-upload</v-icon>
        <div class="text-subtitle-2 font-weight-medium mb-1">
          Drop an image here or click to upload
        </div>
        <div class="text-caption text-medium-emphasis">
          PNG, JPG, or WEBP up to 5 MB
        </div>
      </div>
    </v-card>
    <v-progress-linear
      v-if="isAnalyzing"
      indeterminate
      color="primary"
      class="mb-4"
    />
    <v-alert v-else-if="aiError" type="warning" variant="tonal" class="mb-4">
      {{ aiError }}
    </v-alert>
    <v-card v-if="aiInsights.length" variant="tonal" class="pa-4 mb-4">
      <div class="text-subtitle-2 font-weight-medium mb-2">
        AI Insight: Reusable Biowaste Ideas
      </div>
      <div class="d-flex flex-wrap ga-2">
        <v-chip v-for="(item, index) in aiInsights" :key="index" size="small">
          {{ item }}
        </v-chip>
      </div>
    </v-card>
    <v-row dense>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="form.title"
          label="Listing Title"
          variant="outlined"
          density="comfortable"
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="form.type"
          label="Listing Type"
          variant="outlined"
          density="comfortable"
        />
      </v-col>
      <v-col cols="12">
        <v-textarea
          v-model="form.description"
          label="Description"
          variant="outlined"
          density="comfortable"
          rows="3"
        />
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          v-model.number="form.price"
          label="Price"
          type="number"
          variant="outlined"
          density="comfortable"
          prefix="₱"
          :hint="formattedPrice ? `PHP ${formattedPrice}` : ''"
          persistent-hint
          @blur="normalizePrice"
        />
        <div v-if="aiPriceReason" class="text-caption text-medium-emphasis">
          AI price insight: {{ aiPriceReason }}
        </div>
        <div
          v-if="priceFallbackUsed"
          class="text-caption text-warning-emphasis"
        >
          Invalid price detected. Fallback applied: ₱0.00
        </div>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="form.quality"
          label="Quality"
          variant="outlined"
          density="comfortable"
        />
      </v-col>
      <!-- <v-col cols="12" md="4">
        <v-select
          v-model="form.status"
          :items="['active', 'inactive', 'pending']"
          label="Status"
          variant="outlined"
          density="comfortable"
        />
      </v-col> -->
    </v-row>

    <div class="map-wrapper mb-4">
      <div class="map-header">
        <div class="text-subtitle-2 font-weight-medium">Your Location</div>
        <div v-if="locationError" class="text-caption text-error">
          {{ locationError }}
        </div>
      </div>
      <div ref="mapContainer" class="map-preview" />
      <div class="text-caption text-medium-emphasis mt-2">
        Latitude: {{ latitude.toFixed(4) }}, Longitude:
        {{ longitude.toFixed(4) }}
      </div>
    </div>

    <div class="d-flex justify-end ga-2">
      <v-btn variant="text" :disabled="isSubmitting" @click="resetForm">
        Clear
      </v-btn>
      <v-btn
        color="primary"
        variant="elevated"
        :loading="isSubmitting"
        @click="createListing"
      >
        Create Listing
      </v-btn>
    </div>
  </v-card>
</template>

<style scoped>
.map-wrapper {
  border-radius: 16px;
}

.map-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 8px;
}

.map-preview {
  width: 100%;
  height: 220px;
  border-radius: 16px;
  overflow: hidden;
}
</style>
