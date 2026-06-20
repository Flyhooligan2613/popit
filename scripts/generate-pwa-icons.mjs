import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const svgPath = path.join(root, "public", "icons", "popit-lens-master.svg");
const iconsDir = path.join(root, "public", "icons");
const appDir = path.join(root, "src", "app");

const svg = fs.readFileSync(svgPath);

/** Wrap PNG buffers into a multi-size .ico file (PNG-embedded, Vista+). */
function buildIco(pngBuffers) {
  const count = pngBuffers.length;
  const header = Buffer.alloc(6 + count * 16);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);

  let offset = 6 + count * 16;
  pngBuffers.forEach((buf, i) => {
    const base = 6 + i * 16;
    const dim = buf._dim ?? 32;
    header.writeUInt8(dim >= 256 ? 0 : dim, base);
    header.writeUInt8(dim >= 256 ? 0 : dim, base + 1);
    header.writeUInt8(0, base + 2);
    header.writeUInt8(0, base + 3);
    header.writeUInt16LE(1, base + 4);
    header.writeUInt16LE(32, base + 6);
    header.writeUInt32LE(buf.length, base + 8);
    header.writeUInt32LE(offset, base + 12);
    offset += buf.length;
  });

  return Buffer.concat([header, ...pngBuffers]);
}

/** Maskable safe zone: lens scaled to ~76% centered on 512 canvas */
async function renderMaskable512() {
  const inner = await sharp(svg).resize(390, 390, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  return sharp({
    create: { width: 512, height: 512, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([{ input: inner, gravity: "center" }])
    .png()
    .toBuffer();
}

async function renderPng(size) {
  const buf = await sharp(svg)
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer();
  buf._dim = size;
  return buf;
}

async function main() {
  const outputs = [
    { file: "favicon-16x16.png", size: 16 },
    { file: "favicon-32x32.png", size: 32 },
    { file: "favicon-48x48.png", size: 48 },
    { file: "apple-touch-icon.png", size: 180 },
    { file: "icon-192.png", size: 192 },
    { file: "icon-512.png", size: 512 },
  ];

  const pngMap = new Map();

  for (const { file, size } of outputs) {
    const buf = await renderPng(size);
    pngMap.set(file, buf);
    fs.writeFileSync(path.join(iconsDir, file), buf);
    console.log(`✓ ${file}`);
  }

  const maskable = await renderMaskable512();
  fs.writeFileSync(path.join(iconsDir, "icon-512-maskable.png"), maskable);
  console.log("✓ icon-512-maskable.png");

  const ogLens = await sharp(svg).resize(420, 420, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  const ogImage = await sharp({
    create: { width: 1200, height: 630, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 1 } },
  })
    .composite([{ input: ogLens, gravity: "center" }])
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(iconsDir, "og-image.png"), ogImage);
  console.log("✓ og-image.png");

  fs.writeFileSync(path.join(appDir, "icon.png"), pngMap.get("favicon-32x32.png"));
  fs.writeFileSync(path.join(appDir, "apple-icon.png"), pngMap.get("apple-touch-icon.png"));
  console.log("✓ src/app/icon.png");
  console.log("✓ src/app/apple-icon.png");

  const ico = buildIco([pngMap.get("favicon-16x16.png"), pngMap.get("favicon-32x32.png")]);
  fs.writeFileSync(path.join(appDir, "favicon.ico"), ico);
  fs.writeFileSync(path.join(root, "public", "favicon.ico"), ico);
  console.log("✓ favicon.ico");

  // Keep legacy symlink-style copy
  fs.writeFileSync(path.join(iconsDir, "app-icon.svg"), fs.readFileSync(svgPath));
  console.log("Done — official POP'IT lens icons generated.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
