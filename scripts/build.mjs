import { mkdir, copyFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');

await mkdir(dist, { recursive: true });
await copyFile(path.join(root, 'index.html'), path.join(dist, 'index.html'));
await copyFile(path.join(root, 'styles.css'), path.join(dist, 'styles.css'));
await copyFile(path.join(root, 'script.js'), path.join(dist, 'script.js'));
await writeFile(
  path.join(dist, '.nojekyll'),
  '',
  'utf8'
);

console.log('build complete -> dist');
