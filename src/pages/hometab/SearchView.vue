<template>
  <InnerLayoutWrapper>
    <template #content>
      <v-container fluid class="pa-0">
        <section class="search-view-section">
          <v-container>
            <div class="d-flex align-center mb-4">
              <v-btn
                variant="text"
                prepend-icon="mdi-arrow-left"
                @click="goBack"
              >
                Back
              </v-btn>
            </div>
            <v-card class="search-card mb-6" variant="outlined">
              <v-card-text class="pa-4">
                <v-text-field
                  v-model="query"
                  label="Search biowaste listings"
                  placeholder="Try: coffee grounds, food waste, rice husks"
                  prepend-inner-icon="mdi-magnify"
                  variant="outlined"
                  clearable
                  density="comfortable"
                />
              </v-card-text>
            </v-card>

            <div class="d-flex align-center justify-space-between mb-4">
              <h2 class="text-h5 font-weight-bold">Recommendations</h2>
              <v-chip color="primary" variant="tonal" size="small">
                {{ filteredRecommendations.length }}
                {{ filteredRecommendations.length === 1 ? "Item" : "Items" }}
              </v-chip>
            </div>

            <v-row>
              <v-col
                v-for="item in filteredRecommendations"
                :key="item.id"
                cols="6"
                sm="6"
                md="4"
                lg="3"
              >
                <v-card
                  class="recommendation-card h-100"
                  variant="outlined"
                  hover
                  @click="openRecommendation(item)"
                >
                  <div class="image-container">
                    <v-img
                      v-if="item.image_url"
                      :src="item.image_url"
                      height="180"
                      cover
                      class="recommendation-image"
                    />
                    <div
                      v-else
                      class="no-image-placeholder d-flex align-center justify-center"
                    >
                      <v-icon
                        icon="mdi-image-outline"
                        size="40"
                        color="grey-lighten-1"
                      />
                    </div>
                  </div>

                  <v-card-text class="pa-4">
                    <h3
                      class="text-subtitle-1 font-weight-bold mb-2 line-clamp-2"
                    >
                      {{ item.title }}
                    </h3>

                    <div class="text-body-2 text-medium-emphasis mb-3">
                      {{ item.tag }}
                    </div>

                    <div class="d-flex align-center justify-space-between mb-3">
                      <div class="text-body-2 font-weight-bold">
                        Biowaste Supply
                      </div>
                      <v-chip
                        v-if="item.status"
                        color="primary"
                        size="x-small"
                        variant="tonal"
                        class="text-capitalize"
                      >
                        {{ item.status }}
                      </v-chip>
                    </div>

                    <div class="d-flex align-center justify-space-between mb-2">
                      <v-rating
                        :model-value="item.rating"
                        color="yellow-darken-2"
                        size="14"
                        density="compact"
                        half-increments
                        readonly
                        class="recommendation-rating"
                      />
                      <span class="text-caption text-medium-emphasis">
                        {{ getReviewLabel(item.reviews) }}
                      </span>
                    </div>

                    <div
                      class="d-flex align-center justify-space-between text-caption text-medium-emphasis"
                    >
                      <span>
                        <v-icon start size="14">mdi-information</v-icon>
                        {{ item.subtitle }}
                      </span>

                      <v-chip
                        v-if="item.quality"
                        color="secondary"
                        variant="tonal"
                        size="x-small"
                        class="text-capitalize"
                      >
                        {{ item.quality }}
                      </v-chip>
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </section>
      </v-container>

      <ViewRecommendationsDialog
        v-model="showDialog"
        :recommendation="selectedRecommendation"
        @add-to-cart="handleAddToCart"
        @chat="handleChat"
      />
    </template>
  </InnerLayoutWrapper>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import InnerLayoutWrapper from "@/layouts/InnerLayoutWrapper.vue";
import { recommendations } from "@/pages/hometab/data/recommendationsData";
import type { RecommendationItem } from "@/pages/hometab/data/recommendationsData";
import ViewRecommendationsDialog from "@/pages/hometab/dialogs/ViewRecommendationsDialog.vue";

const route = useRoute();
const router = useRouter();
const query = ref("");
const showDialog = ref(false);
const selectedRecommendation = ref<RecommendationItem | null>(null);

const filteredRecommendations = computed(() => {
  const term = query.value.trim().toLowerCase();
  if (!term) return recommendations;

  return recommendations.filter((item) => {
    return (
      item.title.toLowerCase().includes(term) ||
      item.subtitle.toLowerCase().includes(term) ||
      item.tag.toLowerCase().includes(term)
    );
  });
});

watch(
  () => route.query.q,
  (value) => {
    query.value = typeof value === "string" ? value : "";
  },
  { immediate: true },
);

const goBack = () => {
  if (window.history.length > 1) {
    router.back();
  } else {
    router.push("/");
  }
};

const getReviewLabel = (count: number) => {
  if (!count) return "No ratings";
  return `${count} ${count === 1 ? "review" : "reviews"}`;
};

const openRecommendation = (item: RecommendationItem) => {
  selectedRecommendation.value = item;
  showDialog.value = true;
};

const handleAddToCart = () => {
  showDialog.value = false;
};

const handleChat = () => {
  showDialog.value = false;
};

onMounted(() => {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
});
</script>

<style scoped>
.search-card {
  border-radius: 12px !important;
}

.recommendation-card {
  border-radius: 12px !important;
  transition:
    transform 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
}

.recommendation-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
}

.image-container {
  position: relative;
  overflow: hidden;
}

.recommendation-image {
  transition: transform 0.3s ease-in-out;
}

.recommendation-card:hover .recommendation-image {
  transform: scale(1.04);
}

.no-image-placeholder {
  height: 180px;
  background: rgba(var(--v-theme-surface-variant), 0.3);
  border-bottom: 1px solid rgba(var(--v-border-color), 0.12);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-clamp: 2;
  overflow: hidden;
}
</style>
