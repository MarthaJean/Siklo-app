<template>
  <v-dialog v-model="model" max-width="760" scrollable>
    <v-card v-if="recommendation" class="recommendation-dialog">
      <v-card-title class="pa-4">
        <div class="d-flex align-center w-100">
          <div
            v-if="!isMobile"
            class="text-subtitle-1 text-sm-h6 font-weight-bold title-wrap"
          >
            {{ recommendation.title }}
          </div>
          <div v-else class="flex-grow-1"></div>
          <v-btn
            icon="mdi-close"
            variant="text"
            class="ms-auto"
            @click="close"
          />
        </div>
      </v-card-title>

      <div v-if="isMobile" class="pa-4 pb-0">
        <div class="text-body-1 font-weight-bold title-wrap">
          {{ recommendation.title }}
        </div>
      </div>

      <div class="detail-image-section">
        <v-img :src="recommendation.image_url" max-height="320" cover>
          <template v-slot:error>
            <div
              class="d-flex align-center justify-center fill-height bg-grey-lighten-3"
            >
              <v-icon
                icon="mdi-image-broken-variant"
                size="48"
                color="grey-lighten-1"
              />
            </div>
          </template>
        </v-img>
      </div>

      <v-card-text class="pa-6">
        <div class="d-flex align-center justify-space-between mb-3">
          <div class="text-subtitle-1 font-weight-bold">
            {{ recommendation.tag }}
          </div>
          <v-chip
            color="primary"
            variant="tonal"
            size="small"
            class="text-capitalize"
          >
            {{ recommendation.status }}
          </v-chip>
        </div>

        <p class="text-body-1 text-medium-emphasis mb-4">
          {{ recommendation.subtitle }}
        </p>

        <div class="d-flex align-center justify-space-between mb-2">
          <v-rating
            :model-value="recommendation.rating"
            color="yellow-darken-2"
            size="18"
            density="compact"
            half-increments
            readonly
          />
          <span class="text-caption text-medium-emphasis">
            {{ reviewLabel }}
          </span>
        </div>

        <v-chip
          color="secondary"
          variant="tonal"
          size="small"
          class="text-capitalize"
        >
          {{ recommendation.quality }}
        </v-chip>
      </v-card-text>

      <v-card-actions class="pa-6 pt-0">
        <v-btn
          color="primary"
          variant="elevated"
          prepend-icon="mdi-cart"
          @click="$emit('add-to-cart', recommendation)"
        >
          Add to Cart
        </v-btn>
        <v-btn
          color="secondary"
          variant="outlined"
          prepend-icon="mdi-chat"
          @click="$emit('chat', recommendation)"
        >
          Chat with Supplier
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useDisplay } from "vuetify";
import type { RecommendationItem } from "@/pages/hometab/data/recommendationsData";

type Props = {
  modelValue: boolean;
  recommendation?: RecommendationItem | null;
};

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  recommendation: null,
});

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  "add-to-cart": [recommendation: RecommendationItem];
  chat: [recommendation: RecommendationItem];
}>();

const { smAndDown } = useDisplay();
const isMobile = computed(() => smAndDown.value);

const model = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit("update:modelValue", value),
});

const close = () => {
  emit("update:modelValue", false);
};

const reviewLabel = computed(() => {
  const count = props.recommendation?.reviews || 0;
  if (!count) return "No ratings";
  return `${count} ${count === 1 ? "review" : "reviews"}`;
});
</script>

<style scoped>
.recommendation-dialog {
  border-radius: 12px !important;
}

.detail-image-section {
  border-bottom: 1px solid rgba(var(--v-border-color), 0.12);
}

.title-wrap {
  white-space: normal;
  overflow: visible;
  text-overflow: clip;
  line-height: 1.2;
  padding-top: 4px;
  padding-bottom: 4px;
}
</style>
