import { computed, ref } from "vue";
import type { Ref } from "vue";
import { defineStore } from "pinia";
import { supabase } from "@/lib/supabase";

// Transaction types following the database schema
export type TransactionType = {
  id: number;
  created_at: string;
  buyer_id: string | null;
  seller_id: string | null;
  listing_id: number | null;
  status: string | null;
  ratings: number | null;
};

type CreateTransactionData = {
  buyer_id?: string | null;
  seller_id?: string | null;
  listing_id?: number | null;
  status?: string | null;
  ratings?: number | null;
};

type UpdateTransactionData = {
  buyer_id?: string | null;
  seller_id?: string | null;
  listing_id?: number | null;
  status?: string | null;
  ratings?: number | null;
};

export const useTransactionsDataStore = defineStore("transactionsData", () => {
  // States
  const transactions: Ref<TransactionType[]> = ref([]);
  const currentTransaction: Ref<TransactionType | undefined> = ref(undefined);
  const loading = ref(false);
  const loadingMore = ref(false);
  const hasMore = ref(true);
  const currentPage = ref(0);
  const pageSize = ref(12);
  const error: Ref<string> = ref("");

  // Computed properties
  const transactionsCount = computed(() => transactions.value.length);
  const hasTransactions = computed(() => transactions.value.length > 0);
  const isLoading = computed(() => loading.value);
  const hasError = computed(() => error.value !== "");

  // Helper function to handle errors
  const handleError = (err: unknown, defaultMessage: string) => {
    const errorMessage = err instanceof Error ? err.message : defaultMessage;
    error.value = errorMessage;
  };

  // Clear error state
  const clearError = () => {
    error.value = "";
  };

  // Fetch initial transactions (first page)
  const fetchTransactions = async (reset = false) => {
    if (reset) {
      loading.value = true;
      transactions.value = [];
      currentPage.value = 0;
      hasMore.value = true;
    } else {
      loadingMore.value = true;
    }
    clearError();

    try {
      const { data, error: fetchError } = await supabase
        .from("transactions")
        .select("*")
        .order("created_at", { ascending: false })
        .range(
          currentPage.value * pageSize.value,
          (currentPage.value + 1) * pageSize.value - 1,
        );

      if (fetchError) {
        throw fetchError;
      }

      const newTransactions = data || [];

      if (reset) {
        transactions.value = newTransactions;
      } else {
        transactions.value = [...transactions.value, ...newTransactions];
      }

      hasMore.value = newTransactions.length === pageSize.value;
      if (newTransactions.length > 0) {
        currentPage.value += 1;
      }
    } catch (err) {
      handleError(err, "Failed to fetch transactions");
    } finally {
      loading.value = false;
      loadingMore.value = false;
    }
  };

  // Load more transactions
  const loadMoreTransactions = async () => {
    if (!hasMore.value || loadingMore.value) return;
    await fetchTransactions(false);
  };

  // Fetch transaction by ID
  const fetchTransactionById = async (id: number) => {
    loading.value = true;
    clearError();

    try {
      const { data, error: fetchError } = await supabase
        .from("transactions")
        .select("*")
        .eq("id", id)
        .single();

      if (fetchError) {
        throw fetchError;
      }

      currentTransaction.value = data;
      return data;
    } catch (err) {
      handleError(err, `Failed to fetch transaction with ID ${id}`);
      return undefined;
    } finally {
      loading.value = false;
    }
  };

  // Fetch transactions by buyer ID
  const fetchTransactionsByBuyerId = async (buyerId: string) => {
    loading.value = true;
    clearError();

    try {
      const { data, error: fetchError } = await supabase
        .from("transactions")
        .select("*")
        .eq("buyer_id", buyerId)
        .order("created_at", { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      transactions.value = data || [];
    } catch (err) {
      handleError(err, `Failed to fetch transactions for buyer ${buyerId}`);
    } finally {
      loading.value = false;
    }
  };

  // Fetch transactions by seller ID
  const fetchTransactionsBySellerId = async (sellerId: string) => {
    loading.value = true;
    clearError();

    try {
      const { data, error: fetchError } = await supabase
        .from("transactions")
        .select("*")
        .eq("seller_id", sellerId)
        .order("created_at", { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      transactions.value = data || [];
    } catch (err) {
      handleError(err, `Failed to fetch transactions for seller ${sellerId}`);
    } finally {
      loading.value = false;
    }
  };

  // Fetch transactions by listing ID
  const fetchTransactionsByListingId = async (listingId: number) => {
    loading.value = true;
    clearError();

    try {
      const { data, error: fetchError } = await supabase
        .from("transactions")
        .select("*")
        .eq("listing_id", listingId)
        .order("created_at", { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      transactions.value = data || [];
    } catch (err) {
      handleError(err, `Failed to fetch transactions for listing ${listingId}`);
    } finally {
      loading.value = false;
    }
  };

  // Create new transaction
  const createTransaction = async (transactionData: CreateTransactionData) => {
    loading.value = true;
    clearError();

    try {
      const { data, error: createError } = await supabase
        .from("transactions")
        .insert([transactionData])
        .select()
        .single();

      if (createError) {
        throw createError;
      }

      transactions.value.unshift(data);
      return data;
    } catch (err) {
      handleError(err, "Failed to create transaction");
      return undefined;
    } finally {
      loading.value = false;
    }
  };

  // Update transaction
  const updateTransaction = async (
    id: number,
    updateData: UpdateTransactionData,
  ) => {
    loading.value = true;
    clearError();

    try {
      const { data, error: updateError } = await supabase
        .from("transactions")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

      if (updateError) {
        throw updateError;
      }

      const index = transactions.value.findIndex(
        (transaction) => transaction.id === id,
      );
      if (index !== -1) {
        transactions.value[index] = data;
      }

      if (currentTransaction.value?.id === id) {
        currentTransaction.value = data;
      }

      return data;
    } catch (err) {
      handleError(err, `Failed to update transaction with ID ${id}`);
      return undefined;
    } finally {
      loading.value = false;
    }
  };

  // Delete transaction
  const deleteTransaction = async (id: number) => {
    loading.value = true;
    clearError();

    try {
      const { error: deleteError } = await supabase
        .from("transactions")
        .delete()
        .eq("id", id);

      if (deleteError) {
        throw deleteError;
      }

      transactions.value = transactions.value.filter(
        (transaction) => transaction.id !== id,
      );

      if (currentTransaction.value?.id === id) {
        currentTransaction.value = undefined;
      }

      return true;
    } catch (err) {
      handleError(err, `Failed to delete transaction with ID ${id}`);
      return false;
    } finally {
      loading.value = false;
    }
  };

  // Search transactions by status
  const searchTransactions = computed(() => {
    return (searchTerm: string) => {
      if (!searchTerm.trim()) return transactions.value;

      const term = searchTerm.toLowerCase();
      return transactions.value.filter((transaction) =>
        (transaction.status || "").toLowerCase().includes(term),
      );
    };
  });

  // Clear transactions state
  const clearTransactions = () => {
    transactions.value = [];
    currentTransaction.value = undefined;
    clearError();
  };

  // Clear current transaction
  const clearCurrentTransaction = () => {
    currentTransaction.value = undefined;
  };

  // Reset store to initial state
  const resetStore = () => {
    transactions.value = [];
    currentTransaction.value = undefined;
    loading.value = false;
    loadingMore.value = false;
    hasMore.value = true;
    currentPage.value = 0;
    error.value = "";
  };

  return {
    // State
    transactions,
    currentTransaction,
    loading,
    loadingMore,
    hasMore,
    currentPage,
    pageSize,
    error,

    // Computed
    transactionsCount,
    hasTransactions,
    isLoading,
    hasError,
    searchTransactions,

    // Actions
    fetchTransactions,
    loadMoreTransactions,
    fetchTransactionById,
    fetchTransactionsByBuyerId,
    fetchTransactionsBySellerId,
    fetchTransactionsByListingId,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    clearError,
    clearTransactions,
    clearCurrentTransaction,
    resetStore,
  };
});
