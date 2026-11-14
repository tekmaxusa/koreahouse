/** Short tab labels for long DoorDash section names (mobile-friendly). */
const SHORT_LABELS: Record<string, string> = {
  All: 'All',
  Appetizers: 'Appetizers',
  Soups: 'Soups',
  BBQ: 'BBQ',
  Noodles: 'Noodles',
  'Rice Dishes': 'Rice',
  'Grilled Fishes': 'Grilled Fish',
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
