export type RatingsMap = Map<number, { average: number; count: number }>;

export const formatPricePhp = (price: number | null) => {
  if (price === null || price === undefined) return "Price on request";
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(price);
};

export const formatShortDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const getRatingValue = (ratingsMap: RatingsMap, listingId: number) => {
  const rating = ratingsMap.get(listingId);
  if (!rating || rating.count === 0) return 0;
  return Number(rating.average.toFixed(1));
};

export const getRatingCountLabel = (
  ratingsMap: RatingsMap,
  listingId: number,
) => {
  const rating = ratingsMap.get(listingId);
  if (!rating || rating.count === 0) return "No ratings";
  return `${rating.count} ${rating.count === 1 ? "review" : "reviews"}`;
};
