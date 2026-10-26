// Generates responsive WebP (+ one JPEG fallback) from the untouched originals
// in assets/originals/. Originals are never modified and are not deployed.
// Run: npm run images
import { readdir, mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC = 'assets/originals';
const OUT = 'public/images/liora';
const WIDTHS = [400, 800, 1200, 1600];

await mkdir(OUT, { recursive: true });
const files = (await readdir(SRC)).filter((f) => /\.(png|jpe?g)$/i.test(f));

for (const file of files) {
  const name = path.parse(file).name;
  const image = sharp(path.join(SRC, file));
  const { width, height } = await image.metadata();
  const targets = [...new Set(WIDTHS.filter((w) => w < width).concat(width))];

  for (const w of targets) {
    await image
      .clone()
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(path.join(OUT, `${name}-${w}.webp`));
  }
  // Fallback for the rare browser without WebP support.
  await image
    .clone()
    .resize({ width: Math.min(1200, width), withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(OUT, `${name}.jpg`));

  console.log(`${file} ${width}x${height} -> ${targets.join(', ')}`);
}
