# @bybrave/string-similarity2

Maintained fork of [`string-similarity`](https://www.npmjs.com/package/string-similarity) — finds the degree of similarity between two strings, based on the [Sørensen–Dice coefficient](https://en.wikipedia.org/wiki/S%C3%B8rensen%E2%80%93Dice_coefficient).

The original is **deprecated by its author**. This fork keeps the exact same ratings, and adds **zero dependencies**, dual **ESM + CommonJS**, **built-in TypeScript types**, and a `keySelector` for matching against object arrays.

## Install

```sh
npm install @bybrave/string-similarity2
```

## Usage

```js
import { compareTwoStrings, findBestMatch } from '@bybrave/string-similarity2';

compareTwoStrings('healed', 'sealed'); // 0.8

findBestMatch('healed', ['edward', 'sealed', 'theatre']);
// {
//   ratings: [ { target: 'edward', rating: 0.2 }, { target: 'sealed', rating: 0.8 }, ... ],
//   bestMatch: { target: 'sealed', rating: 0.8 },
//   bestMatchIndex: 1
// }
```

CommonJS works too — `require` returns the same `{ compareTwoStrings, findBestMatch }` object as the original:

```js
const stringSimilarity = require('@bybrave/string-similarity2');
stringSimilarity.compareTwoStrings('france', 'france'); // 1
```

### Matching object arrays (#125)

Pass a third `keySelector` argument to rate against a property while keeping the original objects in `ratings[].target`:

```js
const users = [
  { id: 1, name: 'edward' },
  { id: 2, name: 'sealed' },
];
const { bestMatch } = findBestMatch('healed', users, (u) => u.name);
bestMatch.target; // { id: 2, name: 'sealed' }
```

## What's changed vs `string-similarity@4.0.4`

| Issue | Change |
|---|---|
| [#128](https://github.com/aceakash/string-similarity/issues/128), [#20](https://github.com/aceakash/string-similarity/issues/20) | Ships as native ESM with a CommonJS build via the `exports` map — no CJS optimization bailouts, bundler-friendly. |
| [#125](https://github.com/aceakash/string-similarity/issues/125) | `findBestMatch` accepts an optional `keySelector` to match against an array of objects. |
| [#127](https://github.com/aceakash/string-similarity/issues/127) | License is consistently MIT (the original's `package.json` said ISC while its `LICENSE` said MIT). |
| — | Built-in TypeScript types (no separate `@types/string-similarity` needed). |
| — | Zero dependencies; maintained (the original is deprecated). |

## Migration from `string-similarity`

Drop-in — replace the import:

```diff
- const stringSimilarity = require('string-similarity');
+ const stringSimilarity = require('@bybrave/string-similarity2');
```

Ratings are **identical** to `string-similarity@4.0.4` (the Dice-coefficient formula is unchanged, including its whitespace stripping and the `length < 2 → 0` behaviour).

## License

MIT. Copyright © Akash Kurdekar; fork © bybrave.
