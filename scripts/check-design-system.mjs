import assert from 'node:assert/strict';
import { readFile, readdir, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ESLint } from 'eslint';
const root = fileURLToPath(new URL('../', import.meta.url));
const ds = path.join(root, 'design-system');
async function walk(dir) {
  return (await Promise.all((await readdir(dir, { withFileTypes: true })).map(e =>
    e.isDirectory() ? walk(path.join(dir, e.name)) : path.join(dir, e.name)))).flat();
}
const files = await walk(ds);
let links = 0;
for (const file of files.filter(f => /\.(html|css)$/.test(f))) {
  const text = await readFile(file, 'utf8');
  const urls = file.endsWith('.html')
    ? [...text.matchAll(/(?:src|href)="([^"]+)"/g)].map(m => m[1])
    : [...text.matchAll(/url\(["']?([^\s"')]+)["']?\)|@import\s+["']([^"']+)["']/g)].map(m => m[1] || m[2]);
  for (const url of urls) {
    if (url.startsWith('#') || url.startsWith('data:')) continue;
    assert(!/^(https?:|\/\/|\/)/.test(url), `${file}: nonlocal resource ${url}`);
    const target = path.resolve(path.dirname(file), url.split(/[?#]/)[0]);
    assert(target.startsWith(ds + path.sep), `Escaping reference: ${target}`);
    await access(target); links++;
  }
  assert(!text.includes('_ds_bundle.js') && !text.includes('scratch/devns.js'), `Tool runtime remains: ${file}`);
}
const triage = JSON.parse(await readFile(path.join(ds, 'triage.json'), 'utf8'));
assert.equal(triage.length, 256);
for (const record of triage) {
  assert.match(record.sha256, /^[a-f0-9]{64}$/);
  if (record.destination) await access(path.join(ds, record.destination));
  if (record.source.endsWith('.html')) assert(record.destination.startsWith('references/'));
}
// Verify integration actually enforces the imported rules on consumers, including
// both package aliases and relative deep imports, without rejecting native props.
const lint = new ESLint({ cwd: root });
async function messages(code) {
  return (await lint.lintText(code, { filePath: 'design-system/consumer-probe.jsx' }))[0].messages;
}
assert.equal((await messages('const a = <Button disabled onClick={() => {}} variant="primary" />;')).length, 0);
for (const code of [
  'const a = <Button variant="nonexistent" />;',
  'const color = "#123456";',
  'const space = "19px";',
  'import { Button } from "@harvey/design-system/components/core/Button.jsx";',
  'import { Button } from "./design-system/components/core/Button.jsx";',
]) assert((await messages(code)).length > 0, `Unenforced rule: ${code}`);
assert.equal((await messages('import { Button } from "@harvey/design-system";')).length, 0);
console.log(`Verified ${links} local resource paths, 256 triage records, and adherence rules.`);
