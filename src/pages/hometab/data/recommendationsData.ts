export type RecommendationItem = {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  icon: string;
  image_url: string;
};

export const recommendations: RecommendationItem[] = [
  {
    id: "coffee-grounds",
    title: "Spent coffee grounds",
    subtitle: "Great for compost and soil conditioning",
    tag: "Compost",
    icon: "mdi-coffee",
    image_url:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "kitchen-scraps",
    title: "Kitchen fruit and veg scraps",
    subtitle: "Sorted biowaste for composting",
    tag: "Organic",
    icon: "mdi-fruit-cherries",
    image_url:
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "food-waste",
    title: "Food waste for biogas",
    subtitle: "Clean, non-plastic, ready for digesters",
    tag: "Biogas",
    icon: "mdi-gas-burner",
    image_url:
      "https://images.unsplash.com/photo-1483137140003-ae073b395549?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "yard-waste",
    title: "Dry leaves and yard waste",
    subtitle: "Brown material for compost balance",
    tag: "Yard",
    icon: "mdi-leaf",
    image_url:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "rice-husks",
    title: "Rice husks and straw",
    subtitle: "Bulking agent for composting",
    tag: "Agriculture",
    icon: "mdi-sprout",
    image_url:
      "https://images.unsplash.com/photo-1470004914212-05527e49370b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "coconut-husks",
    title: "Coconut husks",
    subtitle: "Coir fiber for soil and mulch",
    tag: "Coco",
    icon: "mdi-palm-tree",
    image_url:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "manure",
    title: "Livestock manure",
    subtitle: "Aged and ready for composting",
    tag: "Farm",
    icon: "mdi-cow",
    image_url:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "fish-waste",
    title: "Fish processing waste",
    subtitle: "For organic fertilizer production",
    tag: "Fertilizer",
    icon: "mdi-fish",
    image_url:
      "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=800&q=80",
  },
];
