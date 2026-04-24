# Contributing to Orbital

Thank you for your interest in contributing. This guide covers everything you need to go from zero to an open pull request.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setting up the repo](#setting-up-the-repo)
- [Project structure](#project-structure)
- [Development workflow](#development-workflow)
- [Coding standards](#coding-standards)
- [Testing](#testing)
- [Opening a pull request](#opening-a-pull-request)
- [Stellar Wave Program](#stellar-wave-program)

---

## Prerequisites

- **Node.js** 20 or 22 (both are tested in CI)
- **pnpm** 10 — install with `npm install -g pnpm@10`
- **Git**

---

## Setting up the repo

```bash
git clone https://github.com/orbital/orbital.git
cd orbital
pnpm install
```

That installs all workspace packages. No additional steps are needed to run the test suite or typecheck.

---

## Project structure

```
orbital/
├── packages/
│   ├── pulse-core/       # EventEngine, Watcher, Horizon + RPC streaming
│   ├── pulse-webhooks/   # HMAC delivery, retry, SSRF protection
│   └── pulse-notify/     # React hooks
├── apps/
│   ├── server/           # Reference Express server
│   └── web/              # Next.js documentation site
├── tsconfig.base.json    # Shared TypeScript config
└── pnpm-workspace.yaml
```

Each package is an independent TypeScript project with its own `tsconfig.json`, `package.json`, and test suite.

---

## Development workflow

**Typecheck everything:**
```bash
pnpm -r typecheck
```

**Typecheck one package:**
```bash
pnpm tsc --noEmit -p packages/pulse-core/tsconfig.json
```

**Run all tests:**
```bash
pnpm test
```

**Run tests for one package:**
```bash
pnpm --filter @orbital/pulse-core test
```

**Run tests in watch mode:**
```bash
pnpm --filter @orbital/pulse-core exec vitest
```

**Start the reference server:**
```bash
NETWORK=testnet API_KEY=dev pnpm --filter @orbital/server dev
```

---

## Coding standards

- **TypeScript strict mode** is on everywhere — no `any`, no type assertions without justification.
- **No comments** that describe what the code does. Only add a comment when the *why* is non-obvious (a hidden constraint, a workaround for a specific upstream bug, a subtle invariant).
- **No unused exports.** If you add a public export, it must be used or documented.
- **Error handling at system boundaries only.** Don't add try/catch inside internal functions unless there is a clear, specific failure mode to handle.
- **Conventional commits** — prefix your commit messages:
  - `feat:` new behaviour
  - `fix:` bug fix
  - `docs:` documentation only
  - `test:` test only
  - `refactor:` no behaviour change
  - `perf:` performance improvement
  - `chore:` tooling, deps, config

---

## Testing

All packages use [Vitest](https://vitest.dev). Tests live in `packages/<name>/test/`.

- Write a test for every new public API.
- Update existing tests when you change behaviour.
- Coverage is tracked with `@vitest/coverage-v8`. Run `pnpm --filter @orbital/pulse-core test:coverage` to generate a report.

CI runs tests on Node 20 and Node 22. Make sure your changes pass on both.

---

## Opening a pull request

1. **Find or create an issue** that describes the change. Link it in your PR.
2. **Fork the repo** and create a branch: `git checkout -b feat/my-change`.
3. **Make your changes**, keeping commits focused and conventional.
4. **Run the full check locally** before pushing:
   ```bash
   pnpm -r typecheck && pnpm test
   ```
5. **Open the PR** against `main`. Fill in the template — what changed, why, and how to test it.
6. **Respond to review feedback.** A maintainer will review within a few days.

PRs that change public APIs require a description of the migration path. Breaking changes will not be merged until a major version is planned.

---

## Stellar Wave Program

Orbital participates in the [Drips Stellar Wave Program](https://drips.network). Issues tagged `Stellar Wave` are eligible for point rewards.

**Complexity tiers:**

| Label | Points |
|---|---|
| `complexity:trivial` | 100 |
| `complexity:medium` | 150 |
| `complexity:high` | 200 |

**To claim an issue:**
1. Comment on the issue to signal intent.
2. A maintainer will assign it to you.
3. Submit your PR within **14 days** of assignment. If you need more time, comment on the issue and we will extend it.
4. Issues tagged `good-first-issue` are scoped for newcomers — start there if this is your first contribution.

One open issue per contributor at a time for `good-first-issue` items.
