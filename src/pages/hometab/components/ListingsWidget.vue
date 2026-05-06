<template>
  <div class="listings-widget mt-6">
    <!-- Header -->
    <div class="listings-header mb-6">
      <div class="d-flex align-center justify-space-between">
        <div>
          <h2 class="text-h5 font-weight-bold mb-2">
            <v-icon icon="mdi-storefront" class="me-2" color="primary" />
            Latest Listings Near Me
          </h2>
          <p class="text-body-2 text-medium-emphasis">
            Browse recent listings from the marketplace
          </p>
        </div>

        <v-chip
          v-if="previewListings.length > 0"
          color="primary"
          variant="tonal"
          size="small"
        >
          {{ previewListings.length }}
          {{ previewListings.length === 1 ? "Listing" : "Listings" }}
        </v-chip>
      </div>
    </div>

    <SearchWidget class="mb-6" />

    <!-- Loading State -->
    <div v-if="listingsStore.isLoading" class="text-center py-8">
      <v-progress-circular indeterminate color="primary" size="48" />
      <p class="mt-3 text-subtitle-1">Loading listings...</p>
    </div>

    <!-- Empty State -->
    <div
      v-else-if="previewListings.length === 0"
      class="empty-state text-center py-12"
    >
      <v-icon
        icon="mdi-tag-outline"
        size="64"
        color="grey-lighten-1"
        class="mb-4"
      />
      <h3 class="text-h6 mb-2">No listings available</h3>
      <p class="text-body-2 text-medium-emphasis">
        Check back soon for new listings.
      </p>
    </div>

    <!-- Listings Preview -->
    <div v-else>
      <v-row>
        <v-col
          v-for="listing in previewListings"
          :key="listing.id"
          cols="6"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card
            class="listing-card h-100"
            variant="outlined"
            hover
            @click="openListing(listing)"
          >
            <!-- Image -->
            <div class="image-container">
              <v-img
                v-if="listing.image_url"
                :src="listing.image_url"
                height="180"
                cover
                class="listing-image"
              >
                <template v-slot:error>
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

            <!-- Content -->
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
    </div>

    <ViewRecommendationsDialog
      v-model="showDialog"
      :recommendation="selectedRecommendation"
      @add-to-cart="handleAddToCart"
      @chat="handleChat"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useListingsDataStore } from "@/stores/listingsData";
import { useCartDataStore } from "@/stores/cartData";
import { useTransactionsDataStore } from "@/stores/transactionsData";
import SearchWidget from "@/pages/hometab/components/SearchWidget.vue";
import ViewRecommendationsDialog from "@/pages/hometab/dialogs/ViewRecommendationsDialog.vue";
import type { RecommendationItem } from "@/pages/hometab/data/recommendationsData";
import {
  formatPricePhp,
  formatShortDate,
  getRatingCountLabel,
  getRatingValue,
} from "@/pages/hometab/utils/helpers";

const router = useRouter();
const listingsStore = useListingsDataStore();
const transactionsStore = useTransactionsDataStore();
const cartStore = useCartDataStore();
const defaultPrice = 150;
const showDialog = ref(false);
const selectedRecommendation = ref<RecommendationItem | null>(null);

const previewListings = computed(() => listingsStore.listings.slice(0, 8));

const listingRatings = computed(() => {
  const map = new Map<number, { average: number; count: number }>();

  transactionsStore.transactions.forEach((transaction) => {
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

const openListing = (listing: (typeof listingsStore.listings)[number]) => {
  selectedRecommendation.value = {
    id: `listing-${listing.id}`,
    title: listing.title || "Untitled Listing",
    subtitle: listing.description || listing.type || "Community listing",
    tag: listing.type || "Listing",
    icon: "mdi-recycle",
    image_url: listing.image_url || "",
    seller: listing.seller_id || "Seller",
    status: listing.status || "available",
    quality: listing.quality || "standard",
    rating: getRatingValue(listingRatings.value, listing.id),
    reviews: listingRatings.value.get(listing.id)?.count || 0,
  };
  showDialog.value = true;
};

const handleAddToCart = (item: RecommendationItem) => {
  showDialog.value = false;
  const existing = cartStore.getItemById(item.id);
  if (existing) {
    cartStore.updateQuantity(item.id, existing.quantity + 1);
  } else {
    cartStore.addItem({
      id: item.id,
      title: item.title,
      subtitle: item.subtitle,
      tag: item.tag,
      price: defaultPrice,
      quantity: 1,
      image_url: item.image_url,
    });
  }
  router.push({ path: "/cart" });
};

const handleChat = (item: RecommendationItem) => {
  showDialog.value = false;
  router.push({ path: "/chat", query: { item: item.id } });
};

onMounted(async () => {
  await listingsStore.fetchListings(true);
  await transactionsStore.fetchTransactions(true);
});
</script>

<style scoped>
.listings-widget {
  width: 100%;
}

.listings-header {
  padding: 0 16px;
}

.empty-state {
  background: rgba(var(--v-theme-surface-variant), 0.3);
  border-radius: 12px;
  margin: 16px;
}

.listing-card {
  border-radius: 12px !important;
  transition:
    transform 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
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
