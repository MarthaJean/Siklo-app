<script setup lang="ts">
import InnerLayoutWrapper from "@/layouts/InnerLayoutWrapper.vue";
import SellerListings from "@/pages/seller/SellerListings.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const goBack = () => {
  if (window.history.length > 1) {
    router.back();
    return;
  }

  router.push("/home");
};
</script>

<template>
  <InnerLayoutWrapper>
    <template #content>
      <v-container fluid class="pa-4">
        <v-btn class="mb-4" variant="text" color="primary" @click="goBack">
          Back
        </v-btn>
        <SellerListings />
      </v-container>
    </template>
  </InnerLayoutWrapper>
</template>
