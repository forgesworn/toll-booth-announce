# AGENTS.md: toll-booth-announce

Bridge between toll-booth (L402 middleware) and 402-announce (Nostr kind 31402
service discovery). Publishes a kind 31402 event from a toll-booth config so
Nostr clients and AI agents can find a paid API without a centralised registry.

## Build & test

```bash
pnpm build        # tsc
pnpm test         # vitest run
pnpm test:watch   # vitest (watch mode)
```

## Structure

```
src/
  index.ts      : public exports (announce, BoothConfigLike, types)
  announce.ts   : main entry point: maps config then calls 402-announce
  mapper.ts     : BoothConfigLike -> AnnounceConfig (pricing extraction, payment method derivation)
  slugify.ts    : service name -> URL-safe d-tag identifier

tests/
  announce.test.ts
  mapper.test.ts
  slugify.test.ts
```

## Conventions

- British English (colour, behaviour, licence, decentralised)
- Commit messages: `type: description` (feat:, fix:, docs:, refactor:)
- No Co-Authored-By lines in commits
- `forgesworn/anvil@v0` auto-publishes on push to main: `auto-release.yml` bumps the version and creates a GitHub Release; `release.yml` runs pre-publish gates and publishes to npm via OIDC. Do not manually bump version.
- Peer dependency on `@forgesworn/toll-booth`; keep `BoothConfigLike` minimal to avoid tight coupling

## Key design decisions

- ESM-only package (`"type": "module"`), no CJS build
- `BoothConfigLike` reproduces only the subset of toll-booth types needed, avoiding a direct import of toll-booth internals
- Payment methods are auto-derived from config (`hasBackend` implies lightning, `xcashu` implies cashu) but can be overridden
- Pricing extraction handles three formats: flat number, `PriceInfo` (`{sats, usd}`), and tiered (record with a `default` key)
- `urls` field accepts 1 to 10 entries for multi-transport censorship resistance (clearnet, Tor, etc.)

## Common pitfalls

- `402-announce` and `@forgesworn/toll-booth` are dependencies, not siblings to clone: `pnpm install` resolves them from the registry.
- Do not import toll-booth internals directly; go through `BoothConfigLike` to keep the peer dependency loose.

## How to verify a change

Run `pnpm build` then `pnpm test`. CI (`.github/workflows/ci.yml`) runs the same build and test steps with `npm ci`.
