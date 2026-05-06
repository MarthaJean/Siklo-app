import { computed, ref, watch } from "vue";
import type { Ref } from "vue";
import { defineStore } from "pinia";

export type CartItem = {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  price: number;
  quantity: number;
  image_url: string;
};

const CART_CACHE_KEY = "siklo.cart.items";

const loadCache = (): CartItem[] => {
  try {
    const raw = localStorage.getItem(CART_CACHE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
};

const saveCache = (items: CartItem[]) => {
  try {
    localStorage.setItem(CART_CACHE_KEY, JSON.stringify(items));
  } catch {
    // Ignore cache write errors to keep UI responsive.
  }
};

export const useCartDataStore = defineStore("cartData", () => {
  const items: Ref<CartItem[]> = ref(loadCache());

  const itemCount = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0),
  );

  const subtotal = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
  );

  const getItemById = (id: string) => {
    return items.value.find((item) => item.id === id);
  };

  const addItem = (item: CartItem) => {
    const existing = items.value.find((entry) => entry.id === item.id);
    if (existing) {
      existing.quantity += item.quantity;
      return;
    }
    items.value.push({ ...item });
  };

  const updateQuantity = (id: string, quantity: number) => {
    const existing = items.value.find((item) => item.id === id);
    if (!existing) return;
    existing.quantity = Math.max(1, quantity);
  };

  const removeItem = (id: string) => {
    items.value = items.value.filter((item) => item.id !== id);
  };

  const clearCart = () => {
    items.value = [];
  };

  watch(
    items,
    (value) => {
      saveCache(value);
    },
    { deep: true },
  );

  return {
    items,
    itemCount,
    subtotal,
    getItemById,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
  };
});
