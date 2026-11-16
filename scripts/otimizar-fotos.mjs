// Gera as versões web da galeria a partir das fotos originais (que ficam fora do repositório).
//
//   cd scripts && npm install
//   node otimizar-fotos.mjs "<pasta com as fotos originais>"
//
// Saída:
//   assets/galeria/<categoria>/<subcategoria>-NN-<largura>.webp   (800 e 1400 px; nunca amplia)
//   assets/galeria/galeria.json                                    (índice consumido pelo site)
//
// Cada foto é girada conforme o EXIF, recortada (se pedido no manifesto) e salva sem metadados
// (sem GPS, modelo de câmera etc.).

import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CATEGORIAS, FOTOS } from './galeria.manifest.mjs';

const SRC = process.argv[2];
if (!SRC || !fs.existsSync(SRC)) {
  console.error('Uso: node otimizar-fotos.mjs "<pasta com as fotos originais>"');
  process.exit(1);
}
const OUT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'assets', 'galeria');
const LARGURAS = [800, 1400];
const QUALIDADE = { 800: 74, 1400: 76 };
const IGNORADOS = new Set(['madrinha/Screenshot_2026-11-05-10-08-09-739_com.miui.mediaviewer.jpg (1).jpeg']); // duplicata exata

// ── confere se o manifesto cobre exatamente o que existe na pasta ──
const naPasta = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    e.isDirectory() ? walk(p) : naPasta.push(path.relative(SRC, p).split(path.sep).join('/'));
  }
})(SRC);
const noManifesto = new Set(FOTOS.map((x) => x.f));
const faltando = naPasta.filter((f) => !noManifesto.has(f) && !IGNORADOS.has(f));
const sobrando = [...noManifesto].filter((f) => !naPasta.includes(f));
if (faltando.length || sobrando.length) {
  if (faltando.length) console.error('Na pasta, mas fora do manifesto:\n  ' + faltando.join('\n  '));
  if (sobrando.length) console.error('No manifesto, mas ausentes da pasta:\n  ' + sobrando.join('\n  '));
  process.exit(1);
}

// ── detecta faixas pretas (letterbox) nas bordas, em coordenadas da imagem original ──
async function caixaSemFaixasPretas(file, W, H) {
  const { data, info } = await sharp(file, { limitInputPixels: false }).rotate().resize({ width: 300 }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h, channels: c } = info;
  const lum = (x, y) => { const i = (y * w + x) * c; return (data[i] + data[i + 1] + data[i + 2]) / 3; };
  const preto = (get, n) => { let s = 0, s2 = 0; for (let i = 0; i < n; i++) { const v = get(i); s += v; s2 += v * v; } const m = s / n; return m < 10 && Math.sqrt(Math.max(0, s2 / n - m * m)) < 5; };
  let t = 0, b = 0, l = 0, r = 0;
  while (t < h && preto((x) => lum(x, t), w)) t++;
  while (b < h - t && preto((x) => lum(x, h - 1 - b), w)) b++;
  while (l < w && preto((y) => lum(l, y), h)) l++;
  while (r < w - l && preto((y) => lum(w - 1 - r, y), h)) r++;
  const k = W / w, m = 2; // pequena margem de segurança em px
  const left = l ? Math.ceil(l * k) + m : 0, top = t ? Math.ceil(t * k) + m : 0;
  const right = r ? Math.floor((w - r) * k) - m : W, bottom = b ? Math.floor((h - b) * k) - m : H;
  return { left, top, width: right - left, height: bottom - top };
}

// ── processa ──
const contador = {};
const resultado = [];
let totalBytes = 0;

async function processa(foto, idx) {
  const origem = path.join(SRC, foto.f);
  const meta = await sharp(origem, { limitInputPixels: false }).metadata();
  const girada = (meta.orientation ?? 1) >= 5;
  const W0 = girada ? meta.height : meta.width, H0 = girada ? meta.width : meta.height;

  let crop = foto.crop ?? (foto.trim ? await caixaSemFaixasPretas(origem, W0, H0) : null);
  const W = crop ? crop.width : W0, H = crop ? crop.height : H0;

  const chave = foto.c + '/' + (foto.s ?? 'geral');
  const n = (contador[chave] = (contador[chave] ?? 0) + 1);
  const base = `${foto.s ?? foto.c}-${String(n).padStart(2, '0')}`;
  const dir = path.join(OUT, foto.c);
  fs.mkdirSync(dir, { recursive: true });

  const larguras = LARGURAS.filter((x) => x < W);
  if (W <= LARGURAS[LARGURAS.length - 1]) larguras.push(W);

  const geradas = [];
  for (const lw of larguras) {
    let img = sharp(origem, { limitInputPixels: false }).rotate();
    if (crop) img = img.extract(crop);
    const q = QUALIDADE[lw] ?? QUALIDADE[1400];
    const arquivo = path.join(dir, `${base}-${lw}.webp`);
    const info = await img.resize({ width: lw, withoutEnlargement: true }).webp({ quality: q, effort: 5 }).toFile(arquivo);
    totalBytes += info.size;
    geradas.push({ w: info.width, h: info.height, kb: Math.round(info.size / 1024) });
  }
  const maior = geradas[geradas.length - 1];
  resultado[idx] = {
    id: `${foto.c}-${base}`,
    cat: foto.c,
    sub: foto.s ?? null,
    src: `assets/galeria/${foto.c}/${base}`,
    larguras: geradas.map((g) => g.w),
    w: maior.w,
    h: maior.h,
    alt: foto.alt,
    destaque: !!foto.d,
  };
  console.log(`${String(idx + 1).padStart(3)}/${FOTOS.length}  ${foto.c}/${base}  ${geradas.map((g) => `${g.w}w ${g.kb}KB`).join(' · ')}${crop ? '  [recorte]' : ''}`);
}

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

// em lotes pequenos, mantendo a ordem do manifesto (o contador de nomes é sequencial, então processa em série por foto)
for (let i = 0; i < FOTOS.length; i++) await processa(FOTOS[i], i);

const usadas = new Set(resultado.map((r) => r.cat));
const indice = {
  gerado: new Date().toISOString().slice(0, 10),
  categorias: CATEGORIAS.filter((c) => usadas.has(c.id)).map((c) => ({
    id: c.id,
    nome: c.nome,
    total: resultado.filter((r) => r.cat === c.id).length,
    subs: c.subs.map((s) => ({ id: s.id, nome: s.nome, total: resultado.filter((r) => r.cat === c.id && r.sub === s.id).length })),
  })),
  fotos: resultado,
};
fs.writeFileSync(path.join(OUT, 'galeria.json'), JSON.stringify(indice));
// ── sitemap.xml: imagens de destaque entre os marcadores <!-- galeria:inicio --> e <!-- galeria:fim --> ──
const SITE = 'https://msilvalucas.github.io/site-jonas/';
const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const sitemapPath = path.resolve(OUT, '..', '..', 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  const linhas = resultado.filter((r) => r.destaque).map((r) => `    <image:image><image:loc>${SITE}${r.src}-${r.larguras[r.larguras.length - 1]}.webp</image:loc><image:title>${esc(r.alt)} — Jonas Vidal Jr.</image:title></image:image>`);
  let xml = fs.readFileSync(sitemapPath, 'utf8');
  const bloco = `    <!-- galeria:inicio -->\n${linhas.join('\n')}\n    <!-- galeria:fim -->\n`;
  if (xml.includes('<!-- galeria:inicio -->')) xml = xml.replace(/ *<!-- galeria:inicio -->[\s\S]*?<!-- galeria:fim -->\n/, bloco);
  else xml = xml.replace('  </url>', bloco + '  </url>');
  xml = xml.replace(/<lastmod>[^<]*<\/lastmod>/, `<lastmod>${indice.gerado}</lastmod>`);
  fs.writeFileSync(sitemapPath, xml);
}

console.log(`\n${resultado.length} fotos · ${(totalBytes / 1e6).toFixed(1)} MB em assets/galeria · ${resultado.filter((r) => r.destaque).length} destaques`);
