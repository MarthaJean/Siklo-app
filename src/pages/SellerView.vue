<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useAuthUserStore } from "@/stores/authUser";
import InnerLayoutWrapper from "@/layouts/InnerLayoutWrapper.vue";

const authStore = useAuthUserStore();
const { userName } = storeToRefs(authStore);

const displayName = computed(() => userName.value || "Seller");
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
          <v-col cols="12" md="4" class="d-flex justify-end">
            <v-btn color="primary" variant="elevated" prepend-icon="mdi-plus">
              Create Listing
            </v-btn>
          </v-col>
        </v-row>

        <v-row dense>
          <v-col cols="12" md="4">
            <v-card class="pa-4" variant="outlined">
              <div class="text-caption text-medium-emphasis">
                Active Listings
              </div>
              <div class="text-h5 font-weight-bold">0</div>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card class="pa-4" variant="outlined">
              <div class="text-caption text-medium-emphasis">Orders Today</div>
              <div class="text-h5 font-weight-bold">0</div>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card class="pa-4" variant="outlined">
              <div class="text-caption text-medium-emphasis">Revenue (7d)</div>
              <div class="text-h5 font-weight-bold">$0.00</div>
            </v-card>
          </v-col>
        </v-row>

        <v-row dense class="mt-4">
          <v-col cols="12" md="6">
            <v-card class="pa-4" variant="outlined">
              <div class="text-subtitle-1 font-weight-medium mb-2">
                Recent Orders
              </div>
              <div class="text-body-2 text-medium-emphasis">
                No orders yet. New orders will appear here.
              </div>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card class="pa-4" variant="outlined">
              <div class="text-subtitle-1 font-weight-medium mb-2">
                Inventory Alerts
              </div>
              <div class="text-body-2 text-medium-emphasis">
                All inventory levels look good.
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </InnerLayoutWrapper>
</template>
