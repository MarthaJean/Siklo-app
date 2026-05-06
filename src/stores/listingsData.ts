import { computed, ref } from "vue";
import type { Ref } from "vue";
import { defineStore } from "pinia";
import { supabase } from "@/lib/supabase";

// Listing types following the database schema
export type ListingType = {
  id: number;
  created_at: string;
  seller_id: string | null;
  title: string | null;
  type: string | null;
  description: string | null;
  price: number | null;
  quality: string | null;
  status: string | null;
  image_url: string | null;
};

type CreateListingData = {
  seller_id?: string | null;
  title?: string | null;
  type?: string | null;
  description?: string | null;
  price?: number | null;
  quality?: string | null;
  status?: string | null;
  image_url?: string | null;
};

type UpdateListingData = {
  title?: string | null;
  type?: string | null;
  description?: string | null;
  price?: number | null;
  quality?: string | null;
  status?: string | null;
  image_url?: string | null;
};

export const useListingsDataStore = defineStore("listingsData", () => {
  const supabaseImageBaseUrl = import.meta.env.VITE_SUPABASE_IMAGE_URL || "";
  const listingsImageBaseUrl = supabaseImageBaseUrl
    ? `${supabaseImageBaseUrl}listings/`
    : "";

  // States
  const listings: Ref<ListingType[]> = ref([]);
  const currentListing: Ref<ListingType | undefined> = ref(undefined);
  const loading = ref(false);
  const loadingMore = ref(false);
  const hasMore = ref(true);
  const currentPage = ref(0);
  const pageSize = ref(12);
  const error: Ref<string> = ref("");

  // Computed properties
  const listingsCount = computed(() => listings.value.length);
  const hasListings = computed(() => listings.value.length > 0);
  const isLoading = computed(() => loading.value);
  const hasError = computed(() => error.value !== "");

  const normalizeListingImageUrl = (imageUrl?: string | null) => {
    if (!imageUrl) return null;
    if (imageUrl.startsWith("http")) return imageUrl;
    if (!listingsImageBaseUrl) return imageUrl;
    return `${listingsImageBaseUrl}${imageUrl.replace(/^\/+/, "")}`;
  };

  const mapListingImageUrl = (listing: ListingType): ListingType => ({
    ...listing,
    image_url: normalizeListingImageUrl(listing.image_url),
  });

  // Helper function to handle errors
  const handleError = (err: unknown, defaultMessage: string) => {
    const errorMessage = err instanceof Error ? err.message : defaultMessage;
    error.value = errorMessage;
  };

  // Clear error state
  const clearError = () => {
    error.value = "";
  };

  // Fetch initial listings (first page)
  const fetchListings = async (reset = false) => {
    if (reset) {
      loading.value = true;
      listings.value = [];
      currentPage.value = 0;
      hasMore.value = true;
    } else {
      loadingMore.value = true;
    }
    clearError();

    try {
      const { data, error: fetchError } = await supabase
        .from("listings")
        .select("*")
        .order("created_at", { ascending: false })
        .range(
          currentPage.value * pageSize.value,
          (currentPage.value + 1) * pageSize.value - 1,
        );

      if (fetchError) {
        throw fetchError;
      }

      const newListings = (data || []).map(mapListingImageUrl);

      if (reset) {
        listings.value = newListings;
      } else {
        listings.value = [...listings.value, ...newListings];
      }

      hasMore.value = newListings.length === pageSize.value;
      if (newListings.length > 0) {
        currentPage.value += 1;
      }
    } catch (err) {
      handleError(err, "Failed to fetch listings");
    } finally {
      loading.value = false;
      loadingMore.value = false;
    }
  };

  // Load more listings
  const loadMoreListings = async () => {
    if (!hasMore.value || loadingMore.value) return;
    await fetchListings(false);
  };

  // Fetch listing by ID
  const fetchListingById = async (id: number) => {
    loading.value = true;
    clearError();

    try {
      const { data, error: fetchError } = await supabase
        .from("listings")
        .select("*")
        .eq("id", id)
        .single();

      if (fetchError) {
        throw fetchError;
      }

      const normalized = mapListingImageUrl(data);
      currentListing.value = normalized;
      return normalized;
    } catch (err) {
      handleError(err, `Failed to fetch listing with ID ${id}`);
      return undefined;
    } finally {
      loading.value = false;
    }
  };

  // Fetch listings by seller ID
  const fetchListingsBySellerId = async (sellerId: string) => {
    loading.value = true;
    clearError();

    try {
      const { data, error: fetchError } = await supabase
        .from("listings")
        .select("*")
        .eq("seller_id", sellerId)
        .order("created_at", { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      listings.value = (data || []).map(mapListingImageUrl);
    } catch (err) {
      handleError(err, `Failed to fetch listings for seller ${sellerId}`);
    } finally {
      loading.value = false;
    }
  };

  // Create new listing
  const createListing = async (listingData: CreateListingData) => {
    loading.value = true;
    clearError();

    try {
      const payload = {
        ...listingData,
        image_url: normalizeListingImageUrl(listingData.image_url),
      };

      const { data, error: createError } = await supabase
        .from("listings")
        .insert([payload])
        .select()
        .single();

      if (createError) {
        throw createError;
      }

      const normalized = mapListingImageUrl(data);
      listings.value.unshift(normalized);
      return normalized;
    } catch (err) {
      handleError(err, "Failed to create listing");
      return undefined;
    } finally {
      loading.value = false;
    }
  };

  // Update listing
  const updateListing = async (id: number, updateData: UpdateListingData) => {
    loading.value = true;
    clearError();

    try {
      const payload = {
        ...updateData,
        image_url: normalizeListingImageUrl(updateData.image_url),
      };

      const { data, error: updateError } = await supabase
        .from("listings")
        .update(payload)
        .eq("id", id)
        .select()
        .single();

      if (updateError) {
        throw updateError;
      }

      const index = listings.value.findIndex((listing) => listing.id === id);
      const normalized = mapListingImageUrl(data);

      if (index !== -1) {
        listings.value[index] = normalized;
      }

      if (currentListing.value?.id === id) {
        currentListing.value = normalized;
      }

      return normalized;
    } catch (err) {
      handleError(err, `Failed to update listing with ID ${id}`);
      return undefined;
    } finally {
      loading.value = false;
    }
  };

  // Delete listing
  const deleteListing = async (id: number) => {
    loading.value = true;
    clearError();

    try {
      const { error: deleteError } = await supabase
        .from("listings")
        .delete()
        .eq("id", id);

      if (deleteError) {
        throw deleteError;
      }

      listings.value = listings.value.filter((listing) => listing.id !== id);

      if (currentListing.value?.id === id) {
        currentListing.value = undefined;
      }

      return true;
    } catch (err) {
      handleError(err, `Failed to delete listing with ID ${id}`);
      return false;
    } finally {
      loading.value = false;
    }
  };

  // Search listings by title or description
  const searchListings = computed(() => {
    return (searchTerm: string) => {
      if (!searchTerm.trim()) return listings.value;

      const term = searchTerm.toLowerCase();
      return listings.value.filter(
        (listing) =>
          (listing.title || "").toLowerCase().includes(term) ||
          (listing.description || "").toLowerCase().includes(term),
      );
    };
  });

  // Clear listings state
  const clearListings = () => {
    listings.value = [];
    currentListing.value = undefined;
    clearError();
  };

  // Clear current listing
  const clearCurrentListing = () => {
    currentListing.value = undefined;
  };

  // Reset store to initial state
  const resetStore = () => {
    listings.value = [];
    currentListing.value = undefined;
    loading.value = false;
    loadingMore.value = false;
    hasMore.value = true;
    currentPage.value = 0;
    error.value = "";
  };

  return {
    // State
    listings,
    currentListing,
    loading,
    loadingMore,
    hasMore,
    currentPage,
    pageSize,
    error,

    // Computed
    listingsCount,
    hasListings,
    isLoading,
    hasError,
    searchListings,

    // Actions
    fetchListings,
    loadMoreListings,
    fetchListingById,
    fetchListingsBySellerId,
    createListing,
    updateListing,
    deleteListing,
    clearError,
    clearListings,
    clearCurrentListing,
    resetStore,
  };
});
