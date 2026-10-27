import { build, transform } from 'esbuild';
import { readFile, writeFile, mkdir, readdir, copyFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const ds = path.join(root, 'design-system');
const runtime = path.join(ds, 'references/runtime');
await mkdir(runtime, { recursive: true });
for (const [pkg, file] of [['react', 'react'], ['react-dom', 'react-dom']]) {
  await copyFile(path.join(root, `node_modules/${pkg}/umd/${file}.production.min.js`), path.join(runtime, `${file}.js`));
  await copyFile(path.join(root, `node_modules/${pkg}/LICENSE`), path.join(runtime, `${file}.LICENSE`));
}
await build({
  entryPoints: [path.join(ds, 'index.js')], outfile: path.join(runtime, 'components.js'),
  bundle: true, format: 'iife', globalName: 'ProspectBoostDesignSystem_668922',
  plugins: [{ name: 'shared-react', setup(b) {
    b.onResolve({ filter: /^react$/ }, () => ({ path: 'react', namespace: 'global' }));
    b.onLoad({ filter: /.*/, namespace: 'global' }, () => ({ contents: 'module.exports = window.React;' }));
  } }],
});
for (const file of (await readdir(path.join(ds, 'templates/dashboard'))).filter(f => f.endsWith('.jsx'))) {
  const source = await readFile(path.join(ds, 'templates/dashboard', file), 'utf8');
  const { code } = await transform(source, { loader: 'jsx' });
  await writeFile(path.join(runtime, file.replace('.jsx', '.js')), code);
}
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map(e => e.isDirectory() ? walk(path.join(dir, e.name)) : path.join(dir, e.name)))).flat();
}
const htmls = (await walk(path.join(ds, 'references'))).filter(f => f.endsWith('.html') && !f.endsWith('/references/index.html'));
for (const file of htmls) {
  const html = await readFile(file, 'utf8');
  const sources = [...html.matchAll(/<script type="text\/plain" data-reference-jsx>([\s\S]*?)<\/script>/g)];
  if (!sources.length) continue;
  const { code } = await transform(sources.map(m => m[1]).join('\n'), { loader: 'jsx' });
  await writeFile(path.join(runtime, path.relative(ds, file).split(path.sep).join('_').replace('.html', '.js')), code);
}
const links = htmls.sort().map(f => {
  const rel = path.relative(path.join(ds, 'references'), f).split(path.sep).join('/');
  return `<li><a href="${rel}">${rel}</a></li>`;
}).join('\n');
await writeFile(path.join(ds, 'references/index.html'), `<!doctype html>
<html lang="pt-BR"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Harvey — Referências do design system</title>
<link rel="stylesheet" href="../styles.css"><body style="padding:24px"><h1>Referências do design system</h1>
<p>Protótipos ProspectBoost com dados fictícios. Abra qualquer referência abaixo; não há conexão com os dados do Harvey.</p><ul>${links}</ul></body></html>\n`);
console.log(`Built ${htmls.length} offline references from canonical sources.`);
