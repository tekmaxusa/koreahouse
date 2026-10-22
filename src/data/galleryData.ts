import { IMAGES } from './images';

export interface GalleryItem {
  id: string;
  title: string;
  category: "Korean BBQ" | "Korean Classics" | "Sushi & Rolls" | "Atmosphere";
  image: string;
  aspectRatio: "wide" | "square" | "tall";
  description: string;
}

export const GALLERY_CATEGORIES = [
  "All",
  "Korean BBQ",
  "Korean Classics",
  "Sushi & Rolls",
  "Atmosphere"
] as const;

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Artisan Banquet Table at Korea House",
    category: "Korean Classics",
    image: IMAGES.heroKoreanBbqSushi,
    aspectRatio: "wide",
    description: "A lavish Korean BBQ banquet complete with fresh assorted banchan, Korean stews, and hand-crafted sushi."
  },
  {
    id: "gal-2",
    title: "Sizzling LA Galbi Beef Short Ribs",
    category: "Korean BBQ",
    image: IMAGES.koreanLaGalbiBbq,
    aspectRatio: "square",
    description: "Prime beef short ribs caramelized in our signature soy marinade, served steaming hot with toasted sesame and scallions."
  },
  {
    id: "gal-3",
    title: "Dolsot Bibimbap in Sizzling Stone Bowl",
    category: "Korean Classics",
    image: IMAGES.koreanDolsotBibimbap,
    aspectRatio: "square",
    description: "Crispy bottom rice layered with seasoned wild vegetables, savory bulgogi beef, golden yolk, and red pepper gochujang."
  },
  {
    id: "gal-4",
    title: "Chef's Nigiri & Specialty Roll Platter",
    category: "Sushi & Rolls",
    image: IMAGES.sushiSpecialRollsSashimi,
    aspectRatio: "square",
    description: "Pristine salmon and tuna nigiri served alongside fresh artisan specialty rolls, pickled ginger, and freshly ground wasabi."
  },
  {
    id: "gal-5",
    title: "Korea House Dallas Dining Hall & Ambiance",
    category: "Atmosphere",
    image: IMAGES.restaurantInteriorDining,
    aspectRatio: "wide",
    description: "Warm wooden accents, glowing lantern fixtures, and spacious booth seating welcoming Dallas diners since 1979."
  },
  {
    id: "gal-6",
    title: "Bubbling Seafood Soondubu Jjigae",
    category: "Korean Classics",
    image: IMAGES.koreanSoondubuStew,
    aspectRatio: "square",
    description: "Silken soft tofu, clams, enoki mushrooms, and fiery broth bubbling hot in a traditional earthenware ttukbaegi bowl."
  },
  {
    id: "gal-7",
    title: "Crispy Golden Haemul Pajeon",
    category: "Korean Classics",
    image: IMAGES.koreanSeafoodPancake,
    aspectRatio: "square",
    description: "Savory scallion and mixed seafood pancake fried crisp to order, served with our house dipping soy vinegar sauce."
  }
];
