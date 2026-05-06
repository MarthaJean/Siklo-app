<template>
  <InnerLayoutWrapper>
    <template #content>
      <v-container fluid class="pa-0">
        <section class="cart-section">
          <v-container>
            <div class="d-flex align-center justify-space-between mb-4">
              <div class="d-flex align-center">
                <v-btn
                  variant="text"
                  prepend-icon="mdi-arrow-left"
                  class="me-2"
                  @click="goBack"
                >
                  Back
                </v-btn>
                <h2 class="text-h5 font-weight-bold">Cart</h2>
              </div>
              <v-chip color="primary" variant="tonal" size="small">
                {{ itemCount }} {{ itemCount === 1 ? "Item" : "Items" }}
              </v-chip>
            </div>

            <v-row>
              <v-col cols="12" md="8">
                <v-card
                  v-for="item in cartItems"
                  :key="item.id"
                  class="cart-item mb-4"
                  variant="outlined"
                >
                  <v-card-text class="pa-4">
                    <div class="d-flex align-start">
                      <v-avatar size="64" class="me-4" rounded="lg">
                        <v-img :src="item.image_url" cover />
                      </v-avatar>
                      <div class="flex-grow-1">
                        <div class="d-flex align-center justify-space-between">
                          <h3 class="text-subtitle-1 font-weight-bold">
                            {{ item.title }}
                          </h3>
                          <div class="text-body-2 font-weight-bold">
                            {{ formatPricePhp(item.price) }}
                          </div>
                        </div>
                        <div class="text-caption text-medium-emphasis mb-2">
                          {{ item.subtitle }}
                        </div>
                        <div class="d-flex align-center justify-space-between">
                          <v-chip
                            size="x-small"
                            variant="tonal"
                            color="secondary"
                          >
                            {{ item.tag }}
                          </v-chip>
                          <div class="d-flex align-center">
                            <v-btn
                              icon="mdi-minus"
                              size="x-small"
                              variant="text"
                              @click="decreaseQuantity(item.id, item.quantity)"
                            />
                            <span
                              class="text-caption text-medium-emphasis mx-2"
                            >
                              {{ item.quantity }}
                            </span>
                            <v-btn
                              icon="mdi-plus"
                              size="x-small"
                              variant="text"
                              @click="increaseQuantity(item.id, item.quantity)"
                            />
                            <v-btn
                              icon="mdi-delete"
                              size="x-small"
                              variant="text"
                              color="error"
                              class="ms-2"
                              @click="removeItem(item.id)"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12" md="4">
                <v-card class="summary-card" variant="outlined">
                  <v-card-title class="text-subtitle-1 font-weight-bold">
                    Order Summary
                  </v-card-title>
                  <v-card-text>
                    <div class="d-flex align-center justify-space-between mb-2">
                      <span class="text-body-2 text-medium-emphasis"
                        >Subtotal</span
                      >
                      <span class="text-body-2 font-weight-bold">
                        {{ formatPricePhp(subtotal) }}
                      </span>
                    </div>
                    <div class="d-flex align-center justify-space-between mb-4">
                      <span class="text-body-2 text-medium-emphasis"
                        >Delivery</span
                      >
                      <span class="text-body-2 font-weight-bold">{{
                        formatPricePhp(50)
                      }}</span>
                    </div>
                    <v-divider class="mb-4" />
                    <div class="d-flex align-center justify-space-between">
                      <span class="text-subtitle-1 font-weight-bold"
                        >Total</span
                      >
                      <span class="text-subtitle-1 font-weight-bold">
                        {{ formatPricePhp(subtotal + 50) }}
                      </span>
                    </div>
                  </v-card-text>
                  <v-card-actions class="pa-4">
                    <v-btn color="primary" block variant="elevated">
                      Proceed to Checkout
                    </v-btn>
                  </v-card-actions>
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
import { computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import InnerLayoutWrapper from "@/layouts/InnerLayoutWrapper.vue";
import { formatPricePhp } from "@/pages/hometab/utils/helpers";
import { recommendations } from "@/pages/hometab/data/recommendationsData";
import { useCartDataStore } from "@/stores/cartData";

const route = useRoute();
const router = useRouter();
const cartStore = useCartDataStore();

const defaultPrice = 150;

const cartItems = computed(() => cartStore.items);
const itemCount = computed(() => cartStore.itemCount);
const subtotal = computed(() => cartStore.subtotal);

watch(
  () => route.query.item,
  (value) => {
    const selectedId = typeof value === "string" ? value : "";
    if (!selectedId) return;

    const selected = recommendations.find((item) => item.id === selectedId);
    if (!selected) return;

    const existing = cartStore.getItemById(selected.id);
    if (existing) {
      cartStore.updateQuantity(selected.id, existing.quantity + 1);
      return;
    }

    cartStore.addItem({
      id: selected.id,
      title: selected.title,
      subtitle: selected.subtitle,
      tag: selected.tag,
      price: defaultPrice,
      quantity: 1,
      image_url: selected.image_url,
    });
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

const increaseQuantity = (id: string, quantity: number) => {
  cartStore.updateQuantity(id, quantity + 1);
};

const decreaseQuantity = (id: string, quantity: number) => {
  cartStore.updateQuantity(id, quantity - 1);
};

const removeItem = (id: string) => {
  cartStore.removeItem(id);
};
</script>

<style scoped>
.cart-item {
  border-radius: 12px !important;
}

.summary-card {
  border-radius: 12px !important;
}
</style>
