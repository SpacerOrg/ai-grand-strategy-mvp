import { readFile } from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const code = await readFile(path.join(root, 'script.js'), 'utf8');

const store = {};
const makeEl = () => ({
  textContent: '',
  innerHTML: '',
  style: {},
  dataset: {},
  className: '',
  disabled: false,
  appendChild() {},
  addEventListener() {},
  classList: { add() {}, remove() {} },
  closest() { return null; }
});

const document = {
  getElementById() { return makeEl(); },
  createElement() { return makeEl(); }
};

const localStorage = {
  setItem(key, value) { store[key] = value; },
  getItem(key) { return store[key] ?? null; }
};

const context = { document, console, Math, JSON, localStorage };
vm.createContext(context);
vm.runInContext(code, context);
console.log('test ok');
