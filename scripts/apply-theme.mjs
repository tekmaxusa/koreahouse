import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(__dirname, '..', 'src');

/** Order matters: longer / more specific keys first where needed */
const replacements = [
  // Hero / overlay scrims → blue
  ['from-[#0f1115]', 'from-[#1E3A8A]'],
  ['via-[#0f1115]/60', 'via-[#1E40AF]/55'],
  ['from-[#0f1115]/90', 'from-[#1E3A8A]/90'],
  ['to-[#0f1115]/80', 'to-[#1E3A8A]/80'],

  // Primary CTAs (was red) → orange
  ['#852324', '#EA580C'],
  ['#b03032', '#FB923C'],
  ['#9e2a2b', '#F97316'],
  ['#ff7b7b', '#FB923C'],
  ['#ff8e8e', '#FDBA74'],
  ['#ff8080', '#FB923C'],
  ['#ff6b6b', '#F97316'],
  ['shadow-red-950/40', 'shadow-orange-500/25'],
  ['border-red-900/40', 'border-orange-400/50'],

  // Gold accents → blue (icons, labels) or orange (prices)
  ['#f0d47e', '#60A5FA'],
  ['#f2d37c', '#60A5FA'],
  ['#e4c45b', '#3B82F6'],
  ['#e8c56c', '#F97316'],
  ['#c59b27', '#2563EB'],
  ['#b89535', '#EA580C'],
  ['#d4af37', '#2563EB'],

  // Dark backgrounds → white / light blue-gray
  ['#0b0c0f', '#1E3A8A'],
  ['#0f1115', '#FFFFFF'],
  ['#12151d', '#EFF6FF'],
  ['#12151c', '#F8FAFC'],
  ['#13161f', '#F8FAFC'],
  ['#131720', '#FFFFFF'],
  ['#141720', '#DBEAFE'],
  ['#151821', '#FFFFFF'],
  ['#151922', '#F1F5F9'],
  ['#161a24', '#FFFFFF'],
  ['#171b26', '#FFFFFF'],
  ['#181b24', '#EFF6FF'],
  ['#181c25', '#E2E8F0'],
  ['#181d28', '#FFFFFF'],
  ['#1a1d26', '#F8FAFC'],
  ['#1a1e28', '#EFF6FF'],
  ['#1a1f2b', '#EFF6FF'],
  ['#1b202c', '#F8FAFC'],
  ['#1c202a', '#E2E8F0'],
  ['#1c202b', '#F1F5F9'],
  ['#1c212c', '#E2E8F0'],
  ['#1c212d', '#FFFFFF'],
  ['#1d212b', '#BFDBFE'],
  ['#1d222e', '#E2E8F0'],
  ['#1e232f', '#BFDBFE'],
  ['#1f2430', '#E2E8F0'],
  ['#1f2533', '#EFF6FF'],
  ['#222838', '#F1F5F9'],
  ['#232733', '#E2E8F0'],
  ['#232836', '#DBEAFE'],
  ['#232938', '#E2E8F0'],
  ['#252b38', '#EFF6FF'],
  ['#252b3a', '#F1F5F9'],
  ['#262c3b', '#CBD5E1'],
  ['#282f42', '#CBD5E1'],
  ['#2a303c', '#94A3B8'],
  ['#2a3245', '#DBEAFE'],
  ['#2b3140', '#CBD5E1'],
  ['#2b3344', '#CBD5E1'],
  ['#2c3344', '#CBD5E1'],
  ['#2e3648', '#CBD5E1'],
  ['#2f374a', '#CBD5E1'],
  ['#333d52', '#94A3B8'],
  ['#343e54', '#94A3B8'],
  ['#3a4152', '#CBD5E1'],
  ['#3a4154', '#CBD5E1'],
  ['#3a4256', '#93C5FD'],
  ['#3c4454', '#94A3B8'],
  ['#3c4456', '#CBD5E1'],
  ['#12151c', '#F8FAFC'],

  // Light text on dark → dark text on light
  ['#f2efe9', '#0F172A'],
  ['#f5f2eb', '#0F172A'],
  ['#e6e2d8', '#1E293B'],
  ['#dcd6ca', '#334155'],

  // Muted text
  ['#9aa2b2', '#64748B'],
  ['#8a92a3', '#64748B'],
  ['#a2a9b8', '#64748B'],
  ['#959fad', '#64748B'],
  ['#828a9b', '#64748B'],
  ['#7d8799', '#64748B'],
  ['#717a8c', '#64748B'],
  ['#687285', '#94A3B8'],
  ['#758092', '#64748B'],
  ['#8e98ab', '#64748B'],
  ['#7d8699', '#64748B'],
  ['#6e7787', '#64748B'],
  ['#8b93a5', '#64748B'],
  ['#c0c6d4', '#475569'],
  ['#a2aab8', '#64748B'],
  ['#d4dae8', '#E0E7FF'],

  // Misc blues already in design — align to palette
  ['#1e3a5f', '#1E40AF'],
  ['#2d558a', '#3B82F6'],
  ['#70b1ff', '#2563EB'],

  // Hover states
  ['hover:text-white', 'hover:text-[#1E40AF]'],
  ['hover:bg-[#232733]', 'hover:bg-[#EFF6FF]'],
  ['hover:bg-[#1f2533]', 'hover:bg-[#DBEAFE]'],
  ['hover:bg-[#2a3245]', 'hover:bg-[#DBEAFE]'],
  ['hover:bg-[#222838]', 'hover:bg-[#F1F5F9]'],
  ['hover:bg-[#252b38]', 'hover:bg-[#EFF6FF]'],
  ['hover:bg-[#181b24]', 'hover:bg-[#EFF6FF]'],
  ['hover:bg-[#232938]', 'hover:bg-[#EFF6FF]'],
  ['hover:bg-[#1a1d26]', 'hover:bg-[#EFF6FF]'],
  ['hover:bg-[#1c202a]', 'hover:bg-[#EFF6FF]'],
  ['hover:bg-[#252b3a]', 'hover:bg-[#F1F5F9]'],
  ['shadow-black/40', 'shadow-blue-900/10'],
  ['shadow-lg shadow-black/40', 'shadow-lg shadow-blue-900/10'],
];

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full, files);
    else if (/\.(tsx|ts|css)$/.test(name)) files.push(full);
  }
  return files;
}

let total = 0;
for (const file of walk(srcDir)) {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  for (const [from, to] of replacements) {
    if (content.includes(from)) {
      content = content.split(from).join(to);
      changed = true;
    }
  }
  if (changed) {
    fs.writeFileSync(file, content);
    total++;
    console.log('Updated:', path.relative(srcDir, file));
  }
}

console.log(`Done. ${total} file(s) updated.`);
