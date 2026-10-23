/** Short tab labels for long menu section names (mobile-friendly). */
const SHORT_LABELS: Record<string, string> = {
  All: 'All',
  Featured: 'Featured',
  Appetizers: 'Appetizers',
  Soups: 'Soups',
  BBQ: 'BBQ',
  Noodles: 'Noodles',
  'Rice Dishes': 'Rice',
  'Grilled Fishes': 'Grilled Fish',
  "Chef's Specialties": 'Chef Specials',
  'Traditional Korean Dinner': 'Korean Dinner',
  'Dinners (Serves 2)': 'Dinners (2)',
  Side: 'Sides',
  'House Sushi Rolls (Mon-Sat Dinner, Mon-Fri Lunch Only)': 'House Rolls',
  'Special Sushi Rolls (Mon-Sat Dinner, Mon-Fri Lunch Only)': 'Special Rolls',
  'Deep Fried Rolls (Mon-Sat Dinner, Mon-Fri Lunch Only)': 'Fried Rolls',
  'Sushi Appetizers (Mon-Sat Dinner, Mon-Fri Lunch Only)': 'Sushi Apps',
  'Sushi & Sashimi (Mon-Sat Dinner, Mon-Fri Lunch Only)': 'Sushi & Sashimi',
  'Combination Sushi & Sashimi (Monday - Saturday Only)': 'Combos',
};

export function menuCategoryLabel(category: string, variant: 'short' | 'full' = 'short'): string {
  if (variant === 'full') return category;
  return SHORT_LABELS[category] ?? category.replace(/\s*\(Mon.*$/i, '').trim();
}
