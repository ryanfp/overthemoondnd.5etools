import { promises as fs } from "node:fs";
import path from "node:path";

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function copyFile(src, dst) {
  await ensureDir(path.dirname(dst));
  await fs.copyFile(src, dst);
}

async function main() {
  const repoRoot = process.cwd();

  const srcJs = path.join(repoRoot, "node_modules", "nprogress", "nprogress.js");
  const srcCss = path.join(repoRoot, "node_modules", "nprogress", "nprogress.css");

  const outDir = path.join(repoRoot, "lib", "nprogress");
  await ensureDir(outDir);

  await copyFile(srcJs, path.join(outDir, "nprogress.js"));
  await copyFile(srcCss, path.join(outDir, "nprogress.css"));

  console.log("✅ Vendored NProgress to lib/nprogress/");
}

main().catch((err) => {
  console.error("❌ vendor-nprogress failed:", err?.stack || err);
  process.exit(1);
});
