<template>
  <InnerLayoutWrapper>
    <template #content>
      <v-container fluid class="pa-0">
        <section class="search-view-section">
          <v-container>
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
                cols="12"
                sm="6"
                md="4"
                lg="3"
              >
                <v-card
                  class="recommendation-card h-100"
                  variant="outlined"
                  hover
                >
                  <div class="image-container">
                    <v-img
                      :src="item.image_url"
                      height="180"
                      cover
                      class="recommendation-image"
                    />
                  </div>

                  <v-card-text class="pa-4">
                    <div class="d-flex align-center justify-space-between mb-2">
                      <h3 class="text-subtitle-1 font-weight-bold line-clamp-2">
                        {{ item.title }}
                      </h3>
                      <v-icon :icon="item.icon" color="primary" />
                    </div>
                    <p class="text-body-2 text-medium-emphasis mb-3">
                      {{ item.subtitle }}
                    </p>
                    <v-chip size="x-small" variant="tonal" color="secondary">
                      {{ item.tag }}
                    </v-chip>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </section>
      </v-container>
    </template>
  </InnerLayoutWrapper>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import InnerLayoutWrapper from "@/layouts/InnerLayoutWrapper.vue";
import { recommendations } from "@/pages/hometab/data/recommendationsData";

const route = useRoute();
const query = ref("");

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

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-clamp: 2;
  overflow: hidden;
}
</style>
