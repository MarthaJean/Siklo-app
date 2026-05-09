<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useAuthUserStore } from "@/stores/authUser";
import { useListingsDataStore } from "@/stores/listingsData";
import { useTransactionsDataStore } from "@/stores/transactionsData";
import SearchBar from "@/components/ui/SearchBar.vue";
import {
  formatPricePhp,
  formatShortDate,
  getRatingCountLabel,
  getRatingValue,
} from "@/pages/hometab/utils/helpers";

const authStore = useAuthUserStore();
const listingsStore = useListingsDataStore();
const transactionsStore = useTransactionsDataStore();

const { userData } = storeToRefs(authStore);
const { listings, loading, error } = storeToRefs(listingsStore);
const { transactions } = storeToRefs(transactionsStore);

const sellerId = computed(() => userData.value?.id || null);
const searchQuery = ref("");
const hasAnyListings = computed(() => listings.value.length > 0);
const filteredListings = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();

  if (!query) {
    return listings.value;
  }

  return listings.value.filter((listing) => {
    const haystack = [
      listing.title,
      listing.type,
      listing.status,
      listing.quality,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return haystack.includes(query);
  });
});
const hasFilteredListings = computed(() => filteredListings.value.length > 0);
const listingRatings = computed(() => {
  const map = new Map<number, { average: number; count: number }>();

  transactions.value.forEach((transaction) => {
    if (transaction.listing_id === null || transaction.ratings === null) return;

    const current = map.get(transaction.listing_id) || { average: 0, count: 0 };
    const nextCount = current.count + 1;
    const nextAverage =
      (current.average * current.count + transaction.ratings) / nextCount;

    map.set(transaction.listing_id, {
      average: nextAverage,
      count: nextCount,
    });
  });

  return map;
});

const loadSellerListings = async () => {
  if (!sellerId.value) {
    return;
  }

  await listingsStore.fetchListingsBySellerId(sellerId.value);
};

onMounted(() => {
  void loadSellerListings();
  void transactionsStore.fetchTransactions(true);
});

watch(sellerId, () => {
  void loadSellerListings();
});
</script>

<template>
  <v-card-title class="listing-header my-2">
    <div class="listing-header-main">
      <span class="text-h6">Your Listings</span>
      <SearchBar
        v-model="searchQuery"
        placeholder="Search listings"
        class="listing-search"
      />
    </div>
    <v-btn
      variant="text"
      size="small"
      :loading="loading"
      @click="loadSellerListings"
    >
      Refresh
    </v-btn>
  </v-card-title>

  <v-divider />

  <v-card-text>
    <v-alert v-if="!sellerId" type="info" variant="tonal">
      Sign in to view your listings.
    </v-alert>

    <v-alert v-else-if="error" type="error" variant="tonal" class="mb-4">
      {{ error }}
    </v-alert>

    <v-progress-linear
      v-if="loading"
      indeterminate
      color="primary"
      class="mb-4"
    />

    <v-alert v-if="!loading && sellerId && !hasAnyListings" type="info">
      No listings found yet.
    </v-alert>

    <v-alert
      v-else-if="!loading && sellerId && hasAnyListings && !hasFilteredListings"
      type="info"
    >
      No listings match your search.
    </v-alert>

    <v-row v-else>
      <v-col
        v-for="listing in filteredListings"
        :key="listing.id"
        cols="6"
        sm="6"
        md="6"
      >
        <v-card class="listing-card h-100" variant="outlined" hover>
          <div class="image-container">
            <v-img
              v-if="listing.image_url"
              :src="listing.image_url"
              height="180"
              cover
              class="listing-image"
            >
              <template #error>
                <div class="d-flex align-center justify-center fill-height">
                  <v-icon
                    icon="mdi-image-broken-variant"
                    size="40"
                    color="grey-lighten-1"
                  />
                </div>
              </template>
            </v-img>
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
            <h3 class="text-subtitle-1 font-weight-bold mb-2 line-clamp-2">
              {{ listing.title || "Untitled Listing" }}
            </h3>
            <div class="text-body-2 text-medium-emphasis mb-3">
              {{ listing.type || "General" }}
            </div>
            <div class="d-flex align-center justify-space-between mb-3">
              <div class="text-body-2 font-weight-bold">
                {{ formatPricePhp(listing.price) }}
              </div>
              <v-chip
                v-if="listing.status"
                color="primary"
                size="x-small"
                variant="tonal"
                class="text-capitalize"
              >
                {{ listing.status }}
              </v-chip>
            </div>
            <div class="d-flex align-center justify-space-between mb-2">
              <v-rating
                :model-value="getRatingValue(listingRatings, listing.id)"
                color="yellow-darken-2"
                size="14"
                density="compact"
                half-increments
                readonly
                class="listing-rating"
              />
              <span class="text-caption text-medium-emphasis">
                {{ getRatingCountLabel(listingRatings, listing.id) }}
              </span>
            </div>
            <div
              class="d-flex align-center justify-space-between text-caption text-medium-emphasis"
            >
              <span>
                <v-icon start size="14">mdi-calendar</v-icon>
                {{ formatShortDate(listing.created_at) }}
              </span>
              <v-chip
                v-if="listing.quality"
                color="secondary"
                variant="tonal"
                size="x-small"
                class="text-capitalize"
              >
                {{ listing.quality }}
              </v-chip>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-card-text>
</template>

<style scoped>
.listing-card {
  border-radius: 12px !important;
  transition:
    transform 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
}

.listing-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.listing-header-main {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1 1 320px;
}

.listing-search {
  min-width: 200px;
  max-width: 320px;
}

.listing-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
}

.image-container {
  position: relative;
  overflow: hidden;
}

.no-image-placeholder {
  height: 180px;
  background: rgba(var(--v-theme-surface-variant), 0.3);
  border-bottom: 1px solid rgba(var(--v-border-color), 0.12);
}

.listing-image {
  transition: transform 0.3s ease-in-out;
}

.listing-card:hover .listing-image {
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
