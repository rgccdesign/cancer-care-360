// Run after placing both original PNGs in public/images/brand/.
import sharp from 'sharp';
import { access, writeFile } from 'node:fs/promises';
const base = 'public/images/brand/';
const logo = base + 'cancer-care-360-logo.png';
const icon = base + 'cancer-care-360-icon.png';
try { await Promise.all([access(logo), access(icon)]); }
catch { console.error('Original branding files are missing. Supply cancer-care-360-logo.png and cancer-care-360-icon.png in public/images/brand/. No files changed.'); process.exit(1); }
const meta = await sharp(logo).metadata();
for (const size of [16,32,48,180]) {
 await sharp(icon).resize(size,size,{fit:'contain',background:{r:255,g:255,b:255,alpha:0}}).png().toFile(base + `icon-${size}.png`);
}
await writeFile('src/config/brand-assets.json', JSON.stringify({official:true,width:meta.width,height:meta.height},null,2)+'\n');
console.log('Original logo preserved. Favicon PNGs generated at 16, 32, 48 and 180 px. Rebuild the site.');
