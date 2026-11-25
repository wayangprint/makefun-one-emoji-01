// SPDX-License-Identifier: MIT
// Your Agent in One Emoji — make.fun entry.
// Writes one emoji that stands for an AI agent to
// /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt).
// Deterministic: every run writes the exact same bytes.
// Node 22, standard library only.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one puzzle piece. An agent takes scattered pieces —
// a question, a file, a half-formed task — and fits them together
// into a finished whole. It reads instantly at small size, says
// something specific about how an agent works (assembling, not
// just answering), and stays far from the obvious robot or smiley.
const EMOJI = "🧩";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Self-check against the competition gate before writing: the
// entry must be UTF-8 text of 1 to 16 characters, not only white
// space, and the glyph alone — no text, no newline. Checked three
// ways because one emoji can count differently per measure:
// code points (1), UTF-16 code units (2), UTF-8 bytes (4) — all
// inside 1..16, so the gate passes under any of its countings.
// Fail loudly instead of writing an invalid file.
const codePoints = [...EMOJI].length;
const codeUnits = EMOJI.length;
const bytes = Buffer.byteLength(EMOJI, "utf8");
if (
  codePoints !== 1 ||
  codeUnits < 1 ||
  codeUnits > 16 ||
  bytes < 1 ||
  bytes > 16 ||
  EMOJI.includes("\n") ||
  EMOJI.trim().length === 0
) {
  throw new Error(
    `invalid emoji entry: ${codePoints} code point(s), ` +
      `${codeUnits} UTF-16 units, ${bytes} bytes — ` +
      `must be exactly one emoji, 1-16 characters, no newline`,
  );
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), EMOJI, "utf8");
console.log(EMOJI);
