<template>
  <v-card class="search-card" variant="outlined">
    <v-card-text class="pa-4">
      <v-menu
        v-model="menuOpen"
        :close-on-content-click="true"
        transition="fade-transition"
        max-width="600"
      >
        <template v-slot:activator="{ props }">
          <v-text-field
            v-model="query"
            v-bind="props"
            label="Search biowaste listings"
            placeholder="Try: coffee grounds, food waste, rice husks"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            clearable
            density="comfortable"
            @focus="handleSearchFocus"
            @click="handleSearchFocus"
          >
          </v-text-field>
        </template>

        <v-card class="recommendations-card" variant="outlined">
          <v-card-title class="text-subtitle-1 font-weight-bold pa-3">
            Search Recommendations
          </v-card-title>
          <v-divider />
          <v-list density="compact">
            <v-list-item
              v-for="item in filteredRecommendations"
              :key="item.id"
              @click="selectRecommendation(item.title)"
            >
              <template v-slot:prepend>
                <v-avatar size="32" class="recommendation-avatar">
                  <v-img :src="item.image_url" cover />
                </v-avatar>
              </template>
              <v-list-item-title class="text-body-2">
                {{ item.title }}
              </v-list-item-title>
              <v-list-item-subtitle class="text-caption">
                {{ item.subtitle }}
              </v-list-item-subtitle>
              <template v-slot:append>
                <v-chip size="x-small" variant="tonal" color="secondary">
                  {{ item.tag }}
                </v-chip>
              </template>
            </v-list-item>

            <v-list-item v-if="filteredRecommendations.length === 0">
              <v-list-item-title class="text-body-2 text-medium-emphasis">
                No recommendations found
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { recommendations } from "@/pages/hometab/data/recommendationsData";

const query = ref("");
const menuOpen = ref(false);
const router = useRouter();

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

const selectRecommendation = (value: string) => {
  query.value = value;
  menuOpen.value = false;
};

const handleSearchFocus = () => {
  menuOpen.value = false;
  goToSearch();
};

const goToSearch = () => {
  const q = query.value.trim();
  menuOpen.value = false;
  router.push({ path: "/search", query: q ? { q } : {} });
};
</script>

<style scoped>
.search-card {
  border-radius: 12px !important;
}

.recommendations-card {
  border-radius: 12px !important;
  min-width: 520px;
}

.recommendation-avatar {
  border: 1px solid rgba(var(--v-border-color), 0.12);
}

@media (max-width: 600px) {
  .recommendations-card {
    min-width: 100%;
  }
}
</style>
