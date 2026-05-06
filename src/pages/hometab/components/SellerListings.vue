<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useAuthUserStore } from "@/stores/authUser";
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

const resetForm = () => {
  form.value = {
    title: "",
    type: "",
    description: "",
    price: null,
    quality: "",
    status: "active",
  };
  imageFile.value = null;
  if (imagePreviewUrl.value) {
    URL.revokeObjectURL(imagePreviewUrl.value);
  }
  imagePreviewUrl.value = null;
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

const createListing = async () => {
  if (!sellerId.value) {
    return;
  }

  isSubmitting.value = true;

  try {
    await listingsStore.createListing({
      seller_id: sellerId.value,
      title: form.value.title || null,
      type: form.value.type || null,
      description: form.value.description || null,
      price: form.value.price ?? null,
      quality: form.value.quality || null,
      status: form.value.status || null,
      image_url: imageFile.value?.name || null,
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
        />
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
      <div class="d-flex flex-column align-center justify-center text-center">
        <v-icon size="36" class="mb-2">mdi-cloud-upload</v-icon>
        <div class="text-subtitle-2 font-weight-medium mb-1">
          Drop an image here or click to upload
        </div>
        <div class="text-caption text-medium-emphasis">
          PNG, JPG, or WEBP up to 5 MB
        </div>
      </div>
    </v-card>

    <v-img
      v-if="imagePreviewUrl"
      :src="imagePreviewUrl"
      height="180"
      cover
      class="mb-4 rounded-lg"
    />

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

    <v-btn
      color="primary"
      variant="elevated"
      :loading="isSubmitting"
      @click="createListing"
    >
      Create Listing
    </v-btn>
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
