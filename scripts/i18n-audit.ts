/**
 * i18n audit — detects literal user-facing strings in JSX/TSX that are NOT
 * wrapped in t(), useTranslation, or a COPY[language] dictionary.
 *
 * Run: bunx tsx scripts/i18n-audit.ts
 * Output: /tmp/i18n-report.md
 *
 * Pragmatic regex-based scan (no AST). Aim: surface candidates fast,
 * not 100% precision. Reviewer decides what to translate.
 */
import { readdirSync, readFileSync, statSync, writeFileSync, mkdirSync } from 'fs';
import { join, relative, extname } from 'path';

const ROOT = join(process.cwd(), 'src');
const OUT = '/tmp/i18n-report.md';

const SKIP_DIRS = new Set([
  'node_modules', 'dist', 'build', '.next', '.git',
  'components/ui', 'integrations/supabase',
]);

const SKIP_FILES = new Set([
  'i18n.ts', 'constants.ts', 'utils.ts', 'vite-env.d.ts',
]);

interface Finding {
  file: string;
  line: number;
  text: string;
  context: string;
}

const findings: Finding[] = [];

// Heuristic: looks like real human copy (has a space or 4+ letters, contains a vowel)
const looksLikeCopy = (s: string): boolean => {
  const t = s.trim();
  if (t.length < 3) return false;
  if (/^[A-Z_][A-Z0-9_]*$/.test(t)) return false; // CONSTANTS
  if (/^[a-z][a-zA-Z0-9]*$/.test(t) && t.length < 20) return false; // camelCase identifiers
  if (/^[\d\s\W]+$/.test(t)) return false; // numbers/symbols only
  if (!/[aeiouAEIOUáéíóúÁÉÍÓÚ]/.test(t)) return false;
  if (/^(https?:|\/|#|mailto:|tel:|www\.)/.test(t)) return false;
  if (/\.(png|jpg|jpeg|svg|webp|gif|ico|css|js|tsx?)$/i.test(t)) return false;
  // class names heuristic: lots of hyphens / colons / no spaces
  if (!/\s/.test(t) && /[-:]/.test(t) && t.length < 60) return false;
  return /\s/.test(t) || t.length >= 4;
};

const isInTranslationCall = (line: string, idx: number): boolean => {
  const before = line.slice(Math.max(0, idx - 40), idx);
  return /\bt\(\s*["'`][^"'`]*$/.test(before) ||
         /\b(COPY|copy)\[[^\]]+\]\.[a-zA-Z]+\s*$/.test(before) ||
         /\bi18nKey\s*=\s*["'`][^"'`]*$/.test(before);
};

const scanFile = (path: string) => {
  const src = readFileSync(path, 'utf8');
  const lines = src.split('\n');
  const rel = relative(process.cwd(), path);

  // Skip files that already use the i18n system fully
  // (still scan — they may have leftover hardcoded strings)

  lines.forEach((line, i) => {
    // Skip imports, comments
    const trimmed = line.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('*') || trimmed.startsWith('import ')) return;

    // 1) JSX text content: >Texto literal<
    const jsxText = /> *([A-ZÁÉÍÓÚÑ][^<>{}\n]{2,}?) *</g;
    let m: RegExpExecArray | null;
    while ((m = jsxText.exec(line))) {
      const text = m[1].trim();
      if (looksLikeCopy(text) && !/^\{/.test(text)) {
        findings.push({ file: rel, line: i + 1, text, context: trimmed.slice(0, 120) });
      }
    }

    // 2) Common attributes with string literals
    const attrRegex = /\b(placeholder|title|alt|aria-label|label|description)=["']([^"']{3,})["']/g;
    while ((m = attrRegex.exec(line))) {
      const text = m[2];
      if (looksLikeCopy(text) && !isInTranslationCall(line, m.index)) {
        findings.push({
          file: rel, line: i + 1, text: `[${m[1]}] ${text}`,
          context: trimmed.slice(0, 120),
        });
      }
    }
  });
};

const walk = (dir: string) => {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const relPath = relative(ROOT, full);
    if (SKIP_DIRS.has(name) || SKIP_DIRS.has(relPath.replace(/\\/g, '/'))) continue;
    const st = statSync(full);
    if (st.isDirectory()) { walk(full); continue; }
    const ext = extname(name);
    if (!['.tsx', '.ts'].includes(ext)) continue;
    if (SKIP_FILES.has(name)) continue;
    if (name.endsWith('.d.ts') || name.endsWith('.test.ts') || name.endsWith('.test.tsx')) continue;
    scanFile(full);
  }
};

walk(ROOT);

// Group by file
const byFile = new Map<string, Finding[]>();
for (const f of findings) {
  if (!byFile.has(f.file)) byFile.set(f.file, []);
  byFile.get(f.file)!.push(f);
}

const sortedFiles = [...byFile.entries()].sort((a, b) => b[1].length - a[1].length);

let md = `# i18n audit report\n\n`;
md += `Scanned: \`src/\`\n\n`;
md += `**Total findings:** ${findings.length} across ${byFile.size} files\n\n`;
md += `Heuristic: literal JSX text and common string attributes (placeholder, title, alt, aria-label, label, description) that look like human copy and are NOT wrapped in \`t()\` or a \`COPY[language]\` dictionary.\n\n`;
md += `False positives expected (~20-30%). Review before mass-replacing.\n\n`;
md += `---\n\n`;

for (const [file, items] of sortedFiles) {
  md += `## ${file} — ${items.length}\n\n`;
  for (const it of items.slice(0, 50)) {
    md += `- L${it.line}: \`${it.text.replace(/`/g, '\\`')}\`\n`;
  }
  if (items.length > 50) md += `- _…and ${items.length - 50} more_\n`;
  md += `\n`;
}

mkdirSync('/tmp', { recursive: true });
writeFileSync(OUT, md);
console.log(`✓ Report written to ${OUT}`);
console.log(`  ${findings.length} findings in ${byFile.size} files`);
