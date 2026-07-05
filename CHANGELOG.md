# Changelog

Maintained fork of [aceakash/string-similarity](https://github.com/aceakash/string-similarity), which was deprecated by its author and archived.

## 5.0.0 — 2026-07-05

### Added
- Dual ESM + CommonJS build so the package works in both module systems (#128, #20).
- Built-in TypeScript type definitions, removing the need for a separate `@types/string-similarity` install.
- Optional `keySelector` argument in `findBestMatch` to match against arrays of objects; the matched `target` retains the original object (#125).

### Fixed
- Unified the license to MIT to resolve the mismatch between the `LICENSE` file (MIT) and `package.json` (ISC) (#127).
