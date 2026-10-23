/**
 * Builds src/data/menuData.ts + menu images from scripts/ubereats-menu-full.json
 * (from Uber Eats getStoreV1 — Korea House Dallas).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const rawPath = path.join(root, 'scripts', 'ubereats-menu-full.json');
const outDir = path.join(root, 'src', 'assets', 'menu', 'ubereats');
const menuOut = path.join(root, 'src', 'data', 'menuData.ts');

const SECTION_TO_CATEGORY = {
  'Featured items': 'Featured',
  Appetizers: 'Appetizers',
  Soups: 'Soups',
  "Chef's Specialties": "Chef's Specialties",
  'Rice Dishes': 'Rice Dishes',
  'Grilled Fishes': 'Grilled Fishes',
  'Traditional Korean Dinner': 'Traditional Korean Dinner',
  Barbecue: 'BBQ',
  'Sushi and Sashimi (Available for Dinner Mon-Sat) (Available for Lunch Mon-Fri)':
    'Sushi & Sashimi (Mon-Sat Dinner, Mon-Fri Lunch Only)',
  Noodles: 'Noodles',
  'Dinners (Serves 2)': 'Dinners (Serves 2)',
};

const FEATURED_SIGNATURES = new Set([
  'Soondubu Jjigae',
  'Bibimbap',
  'Bulgogi',
  'LA Galbi',
  'Haemul pajun',
  'Japchae',
]);

function slugify(name, index) {
  const base = name
    .toLowerCase()
    .replace(/#/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48);
  return base ? `${base}-${index}` : `item-${index}`;
}

function formatPrice(cents) {
  if (cents == null || Number.isNaN(cents)) return '';
  return `$${(cents / 100).toFixed(2)}`;
}

function spicyFromText(name, description) {
  const text = `${name} ${description}`.toLowerCase();
  if (/very spicy|extra spicy|firecracker|panic roll|hot kiss|jjampong|yukgaejang|habanero/.test(text)) return 2;
  if (/\bspicy\b/.test(text)) return 2;
  return 0;
}

function uberImage800(url) {
  if (!url) return null;
  return url.replace(/width=\d+/, 'width=800').replace(/height=\d+/, 'height=800');
}

const raw = JSON.parse(fs.readFileSync(rawPath, 'utf8'));
const scraped = raw.items ?? raw;

/** @type {Map<string, object>} uuid -> best row */
const byUuid = new Map();

for (const row of scraped) {
  const uuid = row.uuid;
  if (!uuid) continue;
  const category = SECTION_TO_CATEGORY[row.section] ?? row.section;
  const existing = byUuid.get(uuid);
  if (!existing) {
    byUuid.set(uuid, { ...row, category });
    continue;
  }
  if (existing.category === 'Featured' && category !== 'Featured') {
    byUuid.set(uuid, { ...row, category, name: row.name, description: row.description || existing.description, imageUrl: row.imageUrl || existing.imageUrl });
  } else if (!existing.imageUrl && row.imageUrl) {
    byUuid.set(uuid, { ...existing, imageUrl: row.imageUrl });
  }
}

const menuRows = [...byUuid.values()].map((row, index) => ({
  id: `ue-${slugify(row.name, index)}`,
  uberEatsName: row.name,
  name: row.name,
  category: row.category === 'Featured' ? inferCategory(row.name) : row.category,
  price: formatPrice(row.price),
  description: (row.description || '').trim() || 'See Uber Eats menu for details.',
  imageUrl: uberImage800(row.imageUrl),
  isSignature: FEATURED_SIGNATURES.has(row.name),
  spicyLevel: spicyFromText(row.name, row.description || ''),
}));

function inferCategory(name) {
  const n = name.toLowerCase();
  if (/roll|sushi|sashimi|nigiri/.test(n)) return 'Sushi & Sashimi (Mon-Sat Dinner, Mon-Fri Lunch Only)';
  if (/galbi|bulgogi|bbq|pork belly|ribs|teriyaki|dak gui|chadol/.test(n)) return 'BBQ';
  if (/jjigae|guk|tang|soup|mandu guk/.test(n)) return 'Soups';
  if (/bibimbap|rice|deopbap/.test(n)) return 'Rice Dishes';
  if (/naengmyun|udon|ramen|noodle|guksu|yakisoba/.test(n)) return 'Noodles';
  if (/pajun|mandu|edamame|tempura|japchae|dukbokki/.test(n)) return 'Appetizers';
  if (/gui|mackerel|eel|fish/.test(n)) return 'Grilled Fishes';
  return 'Appetizers';
}

fs.mkdirSync(outDir, { recursive: true });

/** @type {Map<string, { varName: string, filename: string }>} */
const urlToImport = new Map();

for (const item of menuRows) {
  if (!item.imageUrl || urlToImport.has(item.imageUrl)) continue;

  const ext = item.imageUrl.includes('.png') ? 'png' : 'jpg';
  const base = slugify(item.uberEatsName, urlToImport.size);
  let filename = `${base}.${ext}`;
  let n = 1;
  while (fs.existsSync(path.join(outDir, filename))) {
    filename = `${base}-${n}.${ext}`;
    n += 1;
  }

  const filePath = path.join(outDir, filename);
  if (!fs.existsSync(filePath)) {
    process.stdout.write(`Downloading ${item.uberEatsName}...\n`);
    try {
      const res = await fetch(item.imageUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; KoreaHouseSite/1.0)' },
      });
      if (!res.ok) {
        console.warn(`Skip image ${item.uberEatsName}: HTTP ${res.status}`);
        item.imageUrl = null;
        continue;
      }
      fs.writeFileSync(filePath, Buffer.from(await res.arrayBuffer()));
    } catch (err) {
      console.warn(`Skip image ${item.uberEatsName}: ${err.message}`);
      item.imageUrl = null;
      continue;
    }
  }

  const varName = `img_${filename.replace(/[^a-zA-Z0-9]/g, '_').replace(/^(\d)/, 'n$1')}`;
  urlToImport.set(item.imageUrl, { varName, filename });
}

const importLines = [...urlToImport.values()].map(
  (rec) => `import ${rec.varName} from '../assets/menu/ubereats/${rec.filename}';`
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
  return `  {
    id: ${JSON.stringify(item.id)},
    name: ${JSON.stringify(item.name)},
    uberEatsName: ${JSON.stringify(item.uberEatsName)},
    category: ${JSON.stringify(item.category)},
    price: ${JSON.stringify(item.price)},
    description: ${JSON.stringify(item.description)},${sig}${spicy}
    image: ${img},
  }`;
});

const content = `/* Auto-generated from Uber Eats Korea House menu — scripts/build-menu-from-ubereats.mjs */
${importLines.join('\n')}

export interface MenuItem {
  id: string;
  name: string;
  /** Exact label on Uber Eats (for ordering). */
  uberEatsName?: string;
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

export const SUSHI_ROLL_CATEGORIES = [
  'Sushi & Sashimi (Mon-Sat Dinner, Mon-Fri Lunch Only)',
] as const;

export const SUSHI_NIGIRI_CATEGORIES = [
  'Sushi & Sashimi (Mon-Sat Dinner, Mon-Fri Lunch Only)',
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
if (raw.hero) console.log('Hero image URL:', raw.hero);
