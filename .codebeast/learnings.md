<!-- source-commit: b7c4ac598efba1b867343db5b7498ba69c52ab48 -->
# Repo learnings

## Gotchas
- npm ci needs a lockfile — run: npm i --package-lock-only before first install if missing.
- JSX must live in .tsx — using .ts with JSX fails TS with TS1005.
- Tailwind purge: include *.mdx in content globs to avoid missing styles.
