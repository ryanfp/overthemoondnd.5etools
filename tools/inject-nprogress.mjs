import { promises as fs } from "node:fs";
import path from "node:path";
import readline from "node:readline";

const BEGIN = "<!-- site-progress:begin -->";
const END = "<!-- site-progress:end -->";

const SNIPPET = `${BEGIN}
<link rel="stylesheet" href="lib/nprogress/nprogress.css">
<link rel="stylesheet" href="css/site-nprogress.css">
<script src="lib/nprogress/nprogress.js"></script>
<script src="js/site-progress.js"></script>
${END}
`;

function parseArgs(argv) {
  const out = { root: ".", yes: false, dryRun: false, remove: false };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--root") out.root = argv[++i] ?? ".";
    else if (a === "--yes") out.yes = true;
    else if (a === "--dry-run") out.dryRun = true;
    else if (a === "--remove") out.remove = true;
  }
  return out;
}

function makeRl() {
  return readline.createInterface({ input: process.stdin, output: process.stdout });
}

function ask(rl, q) {
  return new Promise((resolve) => rl.question(q, (ans) => resolve(ans)));
}

function injectIntoHead(html) {
  if (html.includes(BEGIN)) return { changed: false, html };

  const headOpen = html.match(/<head\b[^>]*>/i);
  if (!headOpen) return { changed: false, html, error: "No <head> tag found." };

  const idx = (headOpen.index ?? 0) + headOpen[0].length;
  const out = html.slice(0, idx) + "\n" + SNIPPET + "\n" + html.slice(idx);
  return { changed: true, html: out };
}

function removeInjected(html) {
  if (!html.includes(BEGIN)) return { changed: false, html };
  const re = new RegExp(`${BEGIN}[\\s\\S]*?${END}\\s*`, "g");
  const out = html.replace(re, "");
  return { changed: true, html: out };
}

async function listRootHtmlFiles(rootDir) {
  const ents = await fs.readdir(rootDir, { withFileTypes: true });
  return ents
    .filter((e) => e.isFile() && e.name.toLowerCase().endsWith(".html"))
    .map((e) => path.join(rootDir, e.name))
    .sort((a, b) => a.localeCompare(b));
}

async function main() {
  const args = parseArgs(process.argv);
  const root = path.resolve(process.cwd(), args.root);

  const files = await listRootHtmlFiles(root);
  if (!files.length) {
    console.log(`No .html files found in: ${root}`);
    return;
  }

  const rl = args.yes ? null : makeRl();

  try {
    for (const file of files) {
      const rel = path.relative(process.cwd(), file);
      const html = await fs.readFile(file, "utf8");

      const op = args.remove ? removeInjected(html) : injectIntoHead(html);

      if (!op.changed) {
        console.log(`- skip: ${rel}${op.error ? ` (${op.error})` : ""}`);
        continue;
      }

      let ok = args.yes;
      if (!args.yes) {
        const ans = (await ask(rl, `Inject into "${rel}"? (Y/N): `)).trim().toLowerCase();
        ok = ans === "y" || ans === "yes";
      }

      if (!ok) {
        console.log(`- no:   ${rel}`);
        continue;
      }

      if (args.dryRun) {
        console.log(`- dry:  ${rel} (would write changes)`);
        continue;
      }

      await fs.writeFile(file, op.html, "utf8");
      console.log(`- yes:  ${rel}`);
    }
  } finally {
    rl?.close();
  }

  console.log("✅ Done.");
}

main().catch((err) => {
  console.error("❌ inject-nprogress failed:", err?.stack || err);
  process.exit(1);
});
