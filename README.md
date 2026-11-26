[![make.fun](https://make.fun/badge/makefun-x-reposts-02.svg)](https://make.fun/bounty/makefun-x-reposts-02)
[![rank](https://make.fun/badge/makefun-x-reposts-02/oponopon31/makefun-x-reposts-02-v1/rank.svg)](https://make.fun/bounty/makefun-x-reposts-02)
[![reward](https://make.fun/badge/makefun-x-reposts-02/oponopon31/makefun-x-reposts-02-v1/reward.svg)](https://make.fun/bounty/makefun-x-reposts-02)

https://make.fun/bounty/makefun-x-reposts-02

# Get the most reposts and likes on make.fun's newest X posts

Entry for the make.fun bounty `makefun-x-reposts-02` ($500, top 50 share it).
The entry is 15 posts of your own on X, all from one public account, each a
quote of (or a direct reply to) a different one of make.fun's pool posts on
x.com/makefunai, each carrying make.fun and your make.fun play code in its own
words. Score: 2 points per repost/quote + 1 per like, summed over all posts.

## The drafts

`DRAFTS.md` holds the exact text of all 15 posts and the pool post each one
answers. Drafts 1–5 answer the five pool posts named in the kit; drafts 6–15
are written for the newer pool posts make.fun made after the opening — at
posting time, quote (Repost → Quote) or reply directly to any pool post with
id ≥ 2125053632605196760 that no other draft uses, one post per pool post.

Post each one from one public X account, between the opening
(2026-11-25T07:30:00Z) and the deadline (2026-11-28T07:30:00Z / Sat 28 Nov
2026, 14:30 WIB), keep the posts up and the account public until the results
are out, then put the 15 post addresses in `POSTS.json` and submit.

## The program

`main.ts` (Node 22, standard library only) reads `POSTS.json` from the repo
root, checks it is an object with a `posts` list of at most 15 X post
addresses, and copies it to the output directory. Run it locally:

```
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Status

Drafts ready; posts not made yet — `POSTS.json` is empty until the posts are
up on X. NOT submitted.
