export type RecommendationItem = {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  icon: string;
  image_url: string;
  status: string;
  quality: string;
  rating: number;
  reviews: number;
};

export const recommendations: RecommendationItem[] = [
  {
    id: "coffee-grounds",
    title: "Spent coffee grounds",
    subtitle: "Great for compost and soil conditioning",
    tag: "Compost",
    icon: "mdi-coffee",
    image_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlDY9ZiHnkgwa1aNBSL_GqOpCK2MjGYbRrng&s",
    status: "available",
    quality: "premium",
    rating: 4.6,
    reviews: 38,
  },
  {
    id: "kitchen-scraps",
    title: "Kitchen fruit and veg scraps",
    subtitle: "Sorted biowaste for composting",
    tag: "Organic",
    icon: "mdi-fruit-cherries",
    image_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH60nmutjDFtssOcZpNBE2ggZsclkVKcYkOA&s",
    status: "available",
    quality: "standard",
    rating: 4.2,
    reviews: 21,
  },
  {
    id: "food-waste",
    title: "Food waste for biogas",
    subtitle: "Clean, non-plastic, ready for digesters",
    tag: "Biogas",
    icon: "mdi-gas-burner",
    image_url:
      "https://i.pinimg.com/736x/4f/b1/37/4fb13738eb2e73a17026e2eb86e70bc1.jpg",
    status: "limited",
    quality: "standard",
    rating: 4.0,
    reviews: 16,
  },
  {
    id: "yard-waste",
    title: "Dry leaves and yard waste",
    subtitle: "Brown material for compost balance",
    tag: "Yard",
    icon: "mdi-leaf",
    image_url:
      "https://yourcleanwater.org/wp-content/uploads/2019/10/Leaf-Bags.jpg",
    status: "available",
    quality: "bulk",
    rating: 4.1,
    reviews: 12,
  },
  {
    id: "rice-husks",
    title: "Rice husks and straw",
    subtitle: "Bulking agent for composting",
    tag: "Agriculture",
    icon: "mdi-sprout",
    image_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYK8LMreSYgyvN2yd53aP3wE-K8AvaDqLkDQ&s",
    status: "available",
    quality: "premium",
    rating: 4.7,
    reviews: 29,
  },
  {
    id: "coconut-husks",
    title: "Coconut husks",
    subtitle: "Coir fiber for soil and mulch",
    tag: "Coco",
    icon: "mdi-palm-tree",
    image_url:
      "https://thanhcongcraft.com/wp-content/uploads/2023/10/What-can-you-do-with-coconut-husk-2.jpg",
    status: "available",
    quality: "premium",
    rating: 4.8,
    reviews: 44,
  },
  {
    id: "manure",
    title: "Livestock manure",
    subtitle: "Aged and ready for composting",
    tag: "Farm",
    icon: "mdi-cow",
    image_url:
      "https://www.treehugger.com/thmb/pQl1YDKynjU8GFrCAMyVYL5GRWA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/wheelbarrow-full-of-manure-545582750-25e7483e24c342cf9a1fe9e9d0a6731c.jpg",
    status: "limited",
    quality: "standard",
    rating: 3.9,
    reviews: 9,
  },
  {
    id: "fish-waste",
    title: "Fish processing waste",
    subtitle: "For organic fertilizer production",
    tag: "Fertilizer",
    icon: "mdi-fish",
    image_url:
      "https://i.guim.co.uk/img/media/cee509aadf14be5ef241dc402f4dc5b23abac0ae/321_883_5976_3586/master/5976.jpg?width=700&quality=85&auto=format&fit=max&s=7a4e1efe6061e82eb5f9a997acb515ad",
    status: "available",
    quality: "standard",
    rating: 4.3,
    reviews: 19,
  },
  {
    id: "sugarcane-bagasse",
    title: "Sugarcane bagasse",
    subtitle: "Good for compost, paper, and biofuel",
    tag: "Biomass",
    icon: "mdi-leaf",
    image_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbuimp1Sh6qAxqlmkz7TOsJIeIIEi_gjNAkg&s",
    status: "available",
    quality: "standard",
    rating: 4.5,
    reviews: 34,
  },
  {
    id: "corn-cobs",
    title: "Dried corn cobs",
    subtitle: "Useful for fuel, animal bedding, and compost",
    tag: "Farm Waste",
    icon: "mdi-corn",
    image_url:
      "https://static.wixstatic.com/media/6e2303_ff45bfcb4ae24e68b5623089406911b5~mv2.jpg/v1/fill/w_1000,h_661,al_c,q_85,usm_0.66_1.00_0.01/6e2303_ff45bfcb4ae24e68b5623089406911b5~mv2.jpg",
    status: "available",
    quality: "standard",
    rating: 4.3,
    reviews: 19,
  },
  {
    id: "grass-clippings",
    title: "Grass clippings",
    subtitle: "Nitrogen-rich green compost material",
    tag: "Organic",
    icon: "mdi-grass",
    image_url:
      "https://www.greenviewfertilizer.com/media/1464/grass-clippings-600.jpg",
    status: "available",
    quality: "fresh",
    rating: 4.1,
    reviews: 15,
  },
  {
    id: "tree-trimmings",
    title: "Tree branches and trimmings",
    subtitle: "Great for mulch, biochar, or fuel",
    tag: "Biomass",
    icon: "mdi-tree",
    image_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSABlKzvXNskYexuj2ZXI16atBKRgKFe0hmsQ&s",
    status: "available",
    quality: "mixed",
    rating: 4.0,
    reviews: 12,
  },
  {
    id: "banana-leaves",
    title: "Banana leaves waste",
    subtitle: "Biodegradable wrapping and compost material",
    tag: "Organic",
    icon: "mdi-leaf-circle",
    image_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxzbJetEoeyILDrPJ_DpUttcrmTj8H77a2aQ&s",
    status: "available",
    quality: "fresh",
    rating: 4.6,
    reviews: 23,
  },
];
