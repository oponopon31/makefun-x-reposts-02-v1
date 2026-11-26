// makefun-x-reposts-02 entry program (Node 22, standard library only).
//
// What it does: read POSTS.json from the repository root, sanity-check its
// shape (an object with a "posts" list of at most 15 X post addresses), and
// copy it unchanged to the grader's output directory, where the gate reads
// it. That is the whole job — the entry itself is the posts on X, not this
// program: posts of your own, all from one public account, each quoting or
// replying directly to a different one of make.fun's pool posts on
// x.com/makefunai, each carrying make.fun or @makefunai and your play code
// in its own words. The house reads each post's reposts, quotes and likes
// from X and scores them; nothing this program writes about the posts is
// scored.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
//
// POSTS.json starts empty (no posts made yet) and is filled with the real
// post addresses once the posts are up on X, then the entry is submitted.

import { copyFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const MAX_POSTS = 15;

const sourcePath = join(BOT_DIR, 'POSTS.json');

if (!existsSync(sourcePath)) {
  console.error(`POSTS.json not found in ${BOT_DIR} — nothing to hand in.`);
  process.exit(1);
}

let posts: unknown;
try {
  const parsed: unknown = JSON.parse(readFileSync(sourcePath, 'utf8'));
  if (typeof parsed !== 'object' || parsed === null || !('posts' in parsed)) {
    throw new Error('POSTS.json must be an object with a "posts" list');
  }
  posts = (parsed as { posts: unknown }).posts;
} catch (err) {
  console.error(`POSTS.json could not be read: ${(err as Error).message}`);
  process.exit(1);
}

if (!Array.isArray(posts)) {
  console.error('POSTS.json "posts" must be a list of post addresses.');
  process.exit(1);
}
if (posts.length > MAX_POSTS) {
  console.error(`POSTS.json names ${posts.length} posts; at most ${MAX_POSTS} are allowed.`);
  process.exit(1);
}
const seen = new Set<string>();
for (const item of posts) {
  if (typeof item !== 'string' || !/x\.com|twitter\.com/.test(item)) {
    console.error(`Not an X post address: ${String(item)}`);
    process.exit(1);
  }
  if (seen.has(item)) {
    // The house reads a post named twice only once, so flag it here rather
    // than silently handing in a shorter list than the writer expected.
    console.warn(`Warning: ${item} is named twice; the house reads it once.`);
  }
  seen.add(item);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
copyFileSync(sourcePath, join(OUTPUT_DIR, 'POSTS.json'));
console.log(`Wrote ${posts.length} post(s) from POSTS.json to ${join(OUTPUT_DIR, 'POSTS.json')}`);
