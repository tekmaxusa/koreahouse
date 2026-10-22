/**
 * Builds src/data/menuData.ts + menu images from scripts/doordash-menu-full.json
 * (exported from DoorDash store page MenuPageItem payloads).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const rawPath = path.join(root, 'scripts', 'doordash-menu-full.json');
const outDir = path.join(root, 'src', 'assets', 'menu', 'doordash');
const menuOut = path.join(root, 'src', 'data', 'menuData.ts');

const SECTION_HEADERS = new Set([
  'Most Ordered',
  'Featured Items',
  'House Sushi Rolls (Mon-Sat Dinner, Mon-Fri Lunch Only)',
  'Special Sushi Rolls (Mon-Sat Dinner, Mon-Fri Lunch Only)',
  'Appetizers',
  'Soups',
  'BBQ',
  'Noodles',
  'Rice Dishes',
  'Grilled Fishes',
  'Side',
  'Sushi Appetizers (Mon-Sat Dinner, Mon-Fri Lunch Only)',
  'Deep Fried Rolls (Mon-Sat Dinner, Mon-Fri Lunch Only)',
  'Sushi & Sashimi  (Mon-Sat Dinner, Mon-Fri Lunch Only)',
  'Sushi & Sashimi (Mon-Sat Dinner, Mon-Fri Lunch Only)',
  'Combination Sushi & Sashimi (Monday - Saturday Only)',
]);

/** DoorDash omits some section headers in MenuPageItem payloads — switch at first item. */
const SECTION_TRANSITIONS = {
  'Fresh Water Eel Sushi 2 pcs': 'Sushi & Sashimi (Mon-Sat Dinner, Mon-Fri Lunch Only)',
  'VIP Sashimi Combo': 'Combination Sushi & Sashimi (Monday - Saturday Only)',
};

const MOST_ORDERED_SIGNATURES = new Set([
  '#69. Soondubu Jjigae',
  '#85. L.A. Galbi',
  '#81. Bulgogi',
  '#33 Haemul Pajun',
  '#60. Galbi Dolsot Bibimbap',
  '#55. Bibimbap',
]);

function normalizePrice(p) {
  if (!p) return '';
  return p.replace(/^\$+/, '$');
}

function slugify(name, index) {
  const base = name
    .toLowerCase()
    .replace(/#/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48);
  return base ? `${base}-${index}` : `item-${index}`;
}

function inferCategoryFromMenuNumber(name) {
  const m = name.match(/#?\s*(\d+)\./);
  if (!m) return null;
  const n = parseInt(m[1], 10);
  if (n >= 33 && n <= 38) return 'Appetizers';
  if (n >= 55 && n <= 61) return 'Rice Dishes';
  if (n >= 64 && n <= 76) return 'Soups';
  if (n >= 77 && n <= 80) return 'Grilled Fishes';
  if (n >= 81 && n <= 96) return 'BBQ';
  if (n >= 119 && n <= 127) return 'Noodles';
  if (n === 35) return 'Noodles';
  return null;
}

function spicyFromText(name, description) {
  const text = `${name} ${description}`.toLowerCase();
  if (/very spicy|extra spicy|firecracker|panic roll|hot kiss|jjampong|yukgaejang/.test(text)) return 2;
  if (/\bspicy\b/.test(text)) return 2;
  return 0;
}

function toDisplayName(ddName) {
  return ddName.replace(/^#\d+\.\s*/, '').replace(/^\d+\.\s*/, '').trim() || ddName;
}

function cdn800(url) {
  if (!url) return null;
  return url.replace(/width=\d+,height=\d+/, 'width=800,height=800').replace(/fit=contain/, 'fit=cover');
}

const raw = JSON.parse(fs.readFileSync(rawPath, 'utf8'));
const scraped = raw.items ?? raw;

let currentSection = 'Most Ordered';
const menuRows = [];
const seenIds = new Set();

for (const row of scraped) {
  const name = row.name?.trim();
  if (!name) continue;

  if (SECTION_HEADERS.has(name)) {
    currentSection = name;
    continue;
  }

  if (SECTION_TRANSITIONS[name]) {
    currentSection = SECTION_TRANSITIONS[name];
  }

  let category = currentSection === 'Most Ordered'
    ? inferCategoryFromMenuNumber(name)
    : currentSection;

  if (!category || category === 'Most Ordered') {
    category = inferCategoryFromMenuNumber(name) ?? 'Appetizers';
  }

  if (category.startsWith('House Sushi Rolls') || category.startsWith('Special Sushi Rolls') || category.startsWith('Deep Fried Rolls')) {
    // keep DoorDash section name as category
  }

  const id = slugify(name, menuRows.length);
  if (seenIds.has(id)) continue;
  seenIds.add(id);

  menuRows.push({
    id: `dd-${id}`,
    doordashName: name,
    name: toDisplayName(name),
    category,
    price: normalizePrice(row.price),
    description: (row.description || '').replace(/\\n/g, ' ').trim() || 'See DoorDash menu for details.',
    imageUrl: cdn800(row.url),
    isSignature: MOST_ORDERED_SIGNATURES.has(name),
    spicyLevel: spicyFromText(name, row.description || ''),
  });
}

fs.mkdirSync(outDir, { recursive: true });

/** @type {Map<string, { varName: string, filename: string }>} */
const urlToImport = new Map();

for (const item of menuRows) {
  if (!item.imageUrl || urlToImport.has(item.imageUrl)) continue;

  const ext = item.imageUrl.includes('.png') ? 'png' : item.imageUrl.includes('.jpeg') ? 'jpeg' : 'jpg';
  const base = slugify(item.doordashName, urlToImport.size);
  let filename = `${base}.${ext}`;
  let n = 1;
  while (fs.existsSync(path.join(outDir, filename))) {
    filename = `${base}-${n}.${ext}`;
    n += 1;
  }

  const filePath = path.join(outDir, filename);
  if (!fs.existsSync(filePath)) {
    process.stdout.write(`Downloading ${item.doordashName}...\n`);
    const res = await fetch(item.imageUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; KoreaHouseSite/1.0)' },
    });
    if (!res.ok) {
      console.warn(`Skip image ${item.doordashName}: HTTP ${res.status}`);
      item.imageUrl = null;
      continue;
    }
    fs.writeFileSync(filePath, Buffer.from(await res.arrayBuffer()));
  }

  const varName = `img_${filename.replace(/[^a-zA-Z0-9]/g, '_').replace(/^(\d)/, 'n$1')}`;
  urlToImport.set(item.imageUrl, { varName, filename });
}

const importLines = [...urlToImport.values()].map(
  (rec) => `import ${rec.varName} from '../assets/menu/doordash/${rec.filename}';`
);

const categories = ['All', ...new Set(menuRows.map((r) => r.category))];

function imageExpr(item) {
  if (!item.imageUrl) return 'undefined';
  const rec = urlToImport.get(item.imageUrl);
  return rec ? rec.varName : 'undefined';
}

const itemLines = menuRows.map((item) => {
  const img = imageExpr(item);
  const sig = item.isSignature ? '\n    isSignature: true,' : '';
  const spicy = item.spicyLevel ? `\n    spicyLevel: ${item.spicyLevel},` : '';
  const korean = '';
  return `  {
    id: ${JSON.stringify(item.id)},
    name: ${JSON.stringify(item.name)},
    doordashName: ${JSON.stringify(item.doordashName)},
    category: ${JSON.stringify(item.category)},
    price: ${JSON.stringify(item.price)},
    description: ${JSON.stringify(item.description)},${sig}${spicy}
    image: ${img},
  }`;
});

const content = `/* Auto-generated from DoorDash Korea House menu — scripts/build-menu-from-doordash.mjs */
${importLines.join('\n')}

export interface MenuItem {
  id: string;
  name: string;
  /** Exact label on DoorDash (for ordering). */
  doordashName?: string;
  koreanName?: string;
  category: string;
  price: string;
  description: string;
  tags?: string[];
  image?: string;
  isSignature?: boolean;
  spicyLevel?: number;
}

export const MENU_CATEGORIES = ${JSON.stringify(categories, null, 2)} as const;

/** DoorDash section names grouped for site sub-pages */
export const SUSHI_ROLL_CATEGORIES = [
  'House Sushi Rolls (Mon-Sat Dinner, Mon-Fri Lunch Only)',
  'Special Sushi Rolls (Mon-Sat Dinner, Mon-Fri Lunch Only)',
  'Deep Fried Rolls (Mon-Sat Dinner, Mon-Fri Lunch Only)',
] as const;

export const SUSHI_NIGIRI_CATEGORIES = [
  'Sushi Appetizers (Mon-Sat Dinner, Mon-Fri Lunch Only)',
  'Sushi & Sashimi  (Mon-Sat Dinner, Mon-Fri Lunch Only)',
  'Sushi & Sashimi (Mon-Sat Dinner, Mon-Fri Lunch Only)',
  'Combination Sushi & Sashimi (Monday - Saturday Only)',
] as const;

export const KOREAN_BBQ_CATEGORY = 'BBQ';
export const KOREAN_SOUP_CATEGORY = 'Soups';
export const KOREAN_RICE_CATEGORY = 'Rice Dishes';
export const KOREAN_NOODLE_CATEGORY = 'Noodles';
export const KOREAN_APPETIZER_CATEGORY = 'Appetizers';
export const GRILLED_FISH_CATEGORY = 'Grilled Fishes';

export const MENU_ITEMS: MenuItem[] = [
${itemLines.join(',\n')}
];
`;

fs.writeFileSync(menuOut, content);
console.log(`Wrote ${menuRows.length} menu items to ${menuOut}`);
console.log(`Categories: ${categories.length - 1}`);
