import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const env = process.argv[2];
if (!env || !["staging", "production"].includes(env)) {
  throw new Error("Usage: node scripts/deploy.mjs <staging|production>");
}

const root = process.cwd();
const dist = join(root, "dist");
if (!existsSync(dist)) {
  throw new Error("dist/ not found. Run build first.");
}

const target = join(root, "deployments", env);
rmSync(target, { recursive: true, force: true });
mkdirSync(target, { recursive: true });
cpSync(dist, target, { recursive: true });

console.log(`Deployed ${env} artifact to ${target}`);
