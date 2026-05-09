<script setup lang="ts">
import { computed, watch } from "vue";
import { storeToRefs } from "pinia";
import { useAuthUserStore } from "@/stores/authUser";
import { useListingsDataStore } from "@/stores/listingsData";
import { useTransactionsDataStore } from "@/stores/transactionsData";

const authStore = useAuthUserStore();
const listingsStore = useListingsDataStore();
const transactionsStore = useTransactionsDataStore();

const { listings, loading: listingsLoading } = storeToRefs(listingsStore);
const { transactions, loading: transactionsLoading } =
  storeToRefs(transactionsStore);

const sellerId = computed(() => authStore.userData?.id || null);
const isLoading = computed(
  () => listingsLoading.value || transactionsLoading.value,
);

const activeListingsCount = computed(() => {
  const items = listings.value || [];
  return items.filter((listing) =>
    listing.status ? listing.status === "active" : true,
  ).length;
});

const totalIncome = computed(() => {
  if (!transactions.value.length || !listings.value.length) {
    return 0;
  }

  const priceByListingId = new Map<number, number>();
  listings.value.forEach((listing) => {
    if (listing.id && listing.price) {
      priceByListingId.set(listing.id, listing.price);
    }
  });

  return transactions.value.reduce((sum, transaction) => {
    const listingId = transaction.listing_id ?? undefined;
    if (!listingId) {
      return sum;
    }

    const listingPrice = priceByListingId.get(listingId) ?? 0;
    return sum + listingPrice;
  }, 0);
});

const formattedTotalIncome = computed(() => {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 2,
  }).format(totalIncome.value);
});

const loadSellerStats = async () => {
  if (!sellerId.value) {
    return;
  }

  await Promise.all([
    listingsStore.fetchListingsBySellerId(sellerId.value),
    transactionsStore.fetchTransactionsBySellerId(sellerId.value),
  ]);
};

watch(
  () => sellerId.value,
  (newSellerId) => {
    if (newSellerId) {
      loadSellerStats();
    }
  },
  { immediate: true },
);
</script>

<template>
  <v-row dense>
    <v-col cols="12" md="6">
      <v-card class="pa-4" variant="outlined">
        <div class="text-caption text-medium-emphasis">Active Listings</div>
        <div class="text-h5 font-weight-bold">
          <span v-if="!isLoading">{{ activeListingsCount }}</span>
          <v-progress-circular
            v-else
            indeterminate
            size="20"
            width="2"
            color="primary"
          />
        </div>
      </v-card>
    </v-col>
    <v-col cols="12" md="6">
      <v-card class="pa-4" variant="outlined">
        <div class="text-caption text-medium-emphasis">Total Income</div>
        <div class="text-h5 font-weight-bold">
          <span v-if="!isLoading">{{ formattedTotalIncome }}</span>
          <v-progress-circular
            v-else
            indeterminate
            size="20"
            width="2"
            color="primary"
          />
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>
