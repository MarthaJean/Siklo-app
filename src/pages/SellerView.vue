<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useAuthUserStore } from "@/stores/authUser";
import { useRouter } from "vue-router";
import InnerLayoutWrapper from "@/layouts/InnerLayoutWrapper.vue";
import SellerListWidget from "@/pages/seller/SellerListWidget.vue";
import SellerStatistics from "@/pages/seller/SellerStatistics.vue";

const authStore = useAuthUserStore();
const router = useRouter();
const { userName } = storeToRefs(authStore);

const displayName = computed(() => userName.value || "Seller");

const goToAddListings = () => {
  router.push("/add-listings");
};
</script>

<template>
  <InnerLayoutWrapper>
    <template #content>
      <v-container fluid class="pa-4">
        <v-row class="mb-6" align="center" justify="space-between">
          <v-col cols="12" md="8">
            <div class="text-h4 font-weight-bold">
              Welcome, {{ displayName }}
            </div>
            <div class="text-body-2 text-medium-emphasis">
              Manage your listings, track orders, and review sales performance.
            </div>
          </v-col>
          <v-col cols="12" md="4" class="text-md-right">
            <v-btn color="primary" variant="elevated" @click="goToAddListings">
              Add Listings
            </v-btn>
          </v-col>
        </v-row>

        <SellerStatistics />

        <SellerListWidget />
      </v-container>
    </template>
  </InnerLayoutWrapper>
</template>
