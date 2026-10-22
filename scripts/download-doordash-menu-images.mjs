import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const catalogPath = path.join(root, 'scripts', 'doordash-menu-catalog.json');
const outDir = path.join(root, 'src', 'assets', 'menu', 'doordash');
const mapOut = path.join(root, 'src', 'data', 'doordashMenuImages.ts');

const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/#/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);
}

function fileExt(url) {
  if (url.includes('.png')) return 'png';
  if (url.includes('.jpeg')) return 'jpeg';
  return 'jpg';
}

fs.mkdirSync(outDir, { recursive: true });

/** @type {Map<string, { varName: string, filename: string }>} */
const urlToFile = new Map();

for (const entry of catalog) {
  if (!entry.url || urlToFile.has(entry.url)) continue;

  const ext = fileExt(entry.url);
  const base = slugify(entry.name) || `item-${urlToFile.size + 1}`;
  let filename = `${base}.${ext}`;
  let n = 1;
  while (fs.existsSync(path.join(outDir, filename))) {
    filename = `${base}-${n}.${ext}`;
    n += 1;
  }

  const filePath = path.join(outDir, filename);
  process.stdout.write(`Downloading ${entry.name}...\n`);
  const res = await fetch(entry.url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; KoreaHouseSite/1.0)' },
  });
  if (!res.ok) {
    throw new Error(`Failed ${entry.name}: ${res.status}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(filePath, buf);

  const importKey = filename.replace(/\.[^.]+$/, '').replace(/-/g, '_');
  urlToFile.set(entry.url, { varName: `dd_${importKey}`, filename });
}

const importLines = [...new Set([...urlToFile.values()].map(
  (rec) => `import ${rec.varName} from '../assets/menu/doordash/${rec.filename}';`
))];

const exportLines = catalog.map((entry) => {
  const rec = urlToFile.get(entry.url);
  if (!rec) return null;
  return `  ${JSON.stringify(entry.name)}: ${rec.varName},`;
}).filter(Boolean);

const uniqueExportLines = [...new Set(exportLines)];

const content = `/* Auto-generated from DoorDash Korea House menu photos. Re-run scripts/download-doordash-menu-images.mjs to refresh. */
${importLines.join('\n')}

export const DOORDASH_MENU_IMAGES: Record<string, string> = {
${uniqueExportLines.join('\n')}
};

function normalizeLabel(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

export function resolveDoorDashMenuImage(itemName: string, category?: string): string | undefined {
  const normalizedItem = normalizeLabel(itemName);
  for (const [ddName, src] of Object.entries(DOORDASH_MENU_IMAGES)) {
    const normalizedDd = normalizeLabel(ddName.replace(/^#\\d+\\.?\\s*/, '').replace(/^\\d+\\.\\s*/, ''));
    if (normalizedItem.includes(normalizedDd) || normalizedDd.includes(normalizedItem)) {
      return src;
    }
  }

  const aliasMap: Record<string, string[]> = {
    'la galbi': ['85', 'l a galbi'],
    'spicy pork bulgogi': ['92', 'spicy pork gui'],
    'samgyupsal': ['92', 'spicy pork'],
    'dak gui': ['90', 'dak gui'],
    'gun mandu': ['mandu'],
    dukbokki: ['bokki'],
    'mul naengmyeon': ['121', 'mul naengmyun'],
    'bibim naengmyeon': ['120', 'bibim guksu'],
    'galbi tang': ['64', 'sullung tang'],
    yukgaejang: ['67', 'galbisal gukbap'],
    'duk mandu guk': ['64', 'sullung tang'],
    'broiled mackerel': ['77', 'saba gui'],
    'salmon teriyaki bento': ['91', 'chicken teriyaki'],
    'bulgogi & sushi bento combo': ['81', 'bulgogi'],
    'korea house special roll': ['house sushi'],
    'dallas roll': ['california roll'],
    'dragon roll': ['shrimp tempura roll'],
    'rainbow roll': ['tuna roll'],
    'spicy tuna roll': ['tuna roll'],
    'chef s nigiri combo': ['tuna roll'],
    'sashimi deluxe': ['tuna roll'],
    'salmon nigiri': ['tuna roll'],
    'tuna nigiri': ['tuna roll'],
    'classic bibimbap': ['55', 'bibimbap'],
    'dolsot bibimbap': ['58', 'dolsot bibimbap'],
    'kimchi fried rice': ['kimchi fried rice'],
    'kimchi jjigae': ['70', 'kimchi jjigae'],
    'soondubu jjigae': ['69', 'soondubu'],
    'haemul pajeon': ['33', 'haemul pajun'],
    'kimchi pajeon': ['34', 'kimchi pajun'],
    edamame: ['38', 'edamame'],
    'shrimp tempura': ['shrimp tempura roll'],
  };

  for (const [needle, tokens] of Object.entries(aliasMap)) {
    if (!normalizedItem.includes(needle)) continue;
    for (const [ddName, src] of Object.entries(DOORDASH_MENU_IMAGES)) {
      const dd = normalizeLabel(ddName);
      if (tokens.some((token) => dd.includes(token))) return src;
    }
  }

  if (category) {
    const categoryImages: Record<string, string | undefined> = {
      Appetizers: DOORDASH_MENU_IMAGES['#33 Haemul Pajun'],
      'Korean BBQ': DOORDASH_MENU_IMAGES['#85. L.A. Galbi'],
      'Rice & Bibimbap': DOORDASH_MENU_IMAGES['#58. Dolsot Bibimbap'],
      'Soups & Stews': DOORDASH_MENU_IMAGES['#69. Soondubu Jjigae'],
      Noodles: DOORDASH_MENU_IMAGES['#35. Japchae'],
      'Sushi Rolls': DOORDASH_MENU_IMAGES['California Roll'],
      'Nigiri & Sashimi': DOORDASH_MENU_IMAGES['Tuna Roll'],
      'Japanese Specialties': DOORDASH_MENU_IMAGES['#91. Chicken Teriyaki'],
      Beverages: DOORDASH_MENU_IMAGES['#38. Edamame'],
    };
    return categoryImages[category];
  }

  return undefined;
}
`;

fs.writeFileSync(mapOut, content);
console.log(`Wrote ${mapOut} with ${urlToFile.size} unique DoorDash images.`);
