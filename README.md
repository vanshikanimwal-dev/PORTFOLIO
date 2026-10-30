# Vanshika Nimwal — portfolio

Personal site for Vanshika Nimwal. The page layout and visible copy follow `docs/design-reference.jpg`. Resume facts live in `src/data/profile.ts`. Public GitHub repos live in `src/data/projects.generated.json`. Where those sources disagree, the mockup text stays on screen and the difference is listed in `TODO.md`.

Sound is off until the HUD toggle is pressed. Effects are generated in the browser. There are no audio files.

To restyle the pixel avatar, edit the row strings in `src/components/pixel/sprites.tsx` (`PixelAvatar`). `H` is hair, `B` is the bow, `S` is skin, `M` is the shirt.

Hand-made sprites replace those SVGs when the files exist:

| File | Expected art |
| --- | --- |
| `public/images/pixel/avatar.png` | 32×48 spritesheet, 4 idle frames in one horizontal strip (128×48) |
| `public/images/pixel/cat.png` | Single cat frame |
| `public/images/pixel/tree.png` | Single tree frame |
| `public/images/pixel/lamp.png` | Single lamp frame |
| `public/images/pixel/console.png` | Single console frame |

They render with `image-rendering: pixelated`. Missing files fall back to the SVG sprites.

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Local dev server |
| `npm run build` | Production build |
| `npm run lint` | Next.js ESLint |
| `npm run sync:github` | Refresh `src/data/projects.generated.json` |

## Sync GitHub

`scripts/fetch-github.ts` loads every public repository for `vanshikanimwal-dev`. Forks are included only when they contain her own commits. Set `GITHUB_TOKEN` to raise the API rate limit. Descriptions and categories live in `src/data/project-curation.ts` and are kept across syncs. New repositories without a curation entry get a short README excerpt, the category `Uncategorized`, and `featured: false`.

If the API fails or rate-limits, the script leaves the committed JSON in place.

```bash
npm run sync:github
```

## Blog

Add a file in `content/blog/name.mdx`:

```mdx
---
title: "Post title"
date: "2026-10-27"
tags: ["java"]
excerpt: "One or two sentences."
mood: "✦"
placeholder: false
---

## A heading

Body copy. Fenced code blocks are highlighted with Shiki.
```

The diary index, the post page, and `/rss.xml` pick the file up on the next build.

## Contact form

The form posts to `/api/contact`, validates with Zod, and ignores submissions that fill the hidden company field. Mail goes out through [Resend](https://resend.com).

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL` (defaults to the resume email)
- `RESEND_FROM` (defaults to Resend's shared onboarding sender until a domain is verified)

Without `RESEND_API_KEY` the form returns a configuration error. It does not pretend the message was sent.

## Deploy

The app is ready for Vercel and does not need a `vercel.json`. Set the env vars in `.env.example` and set `NEXT_PUBLIC_SITE_URL` to the production URL so metadata, the sitemap, RSS, and JSON-LD point at the real site.

The resume download is `public/resume.pdf`. A copy of the source PDF is in `docs/resume.pdf`.

## Data gaps

See the TODO list in `src/data/profile.ts` (`profileTodos`). Notable ones: no resume photo (GitHub avatar is used), Capital Bull Wave and the Ferrero freelance role have no dates, achievements and named hackathons are absent, and years of experience are not stated.
