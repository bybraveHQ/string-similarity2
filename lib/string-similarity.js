// Finds the degree of similarity between strings, based on Dice's Coefficient.
// Ported from aceakash/string-similarity 4.0.4 (MIT) — the rating formula is
// preserved byte-for-byte; only ESM packaging, types and an optional
// keySelector for findBestMatch (#125) are added.

/**
 * Similarity rating (0..1) between two strings, based on bigram Dice coefficient.
 * Whitespace is stripped before comparison.
 * @param {string} first
 * @param {string} second
 * @returns {number} 0..1
 */
export function compareTwoStrings(first, second) {
  first = first.replace(/\s+/g, '');
  second = second.replace(/\s+/g, '');

  if (first === second) return 1; // identical or empty
  if (first.length < 2 || second.length < 2) return 0; // 0- or 1-letter string

  const firstBigrams = new Map();
  for (let i = 0; i < first.length - 1; i++) {
    const bigram = first.substring(i, i + 2);
    const count = firstBigrams.has(bigram) ? firstBigrams.get(bigram) + 1 : 1;
    firstBigrams.set(bigram, count);
  }

  let intersectionSize = 0;
  for (let i = 0; i < second.length - 1; i++) {
    const bigram = second.substring(i, i + 2);
    const count = firstBigrams.has(bigram) ? firstBigrams.get(bigram) : 0;
    if (count > 0) {
      firstBigrams.set(bigram, count - 1);
      intersectionSize++;
    }
  }

  return (2.0 * intersectionSize) / (first.length + second.length - 2);
}

/**
 * Rate `mainString` against each target and return the ratings plus the best match.
 * `targets` may be an array of strings, or — with `keySelector` (#125) — an array
 * of objects, in which case `ratings[].target` keeps the original object.
 * @param {string} mainString
 * @param {Array} targets
 * @param {(item: any) => string} [keySelector]
 */
export function findBestMatch(mainString, targets, keySelector) {
  if (!areArgsValid(mainString, targets, keySelector)) {
    throw new Error(
      'Bad arguments: First argument should be a string, second should be an array of strings' +
        (keySelector ? ' or objects, and the third a key-selector function' : '')
    );
  }

  const ratings = [];
  let bestMatchIndex = 0;

  for (let i = 0; i < targets.length; i++) {
    const item = targets[i];
    const str = keySelector ? keySelector(item) : item;
    const currentRating = compareTwoStrings(mainString, str);
    ratings.push({ target: item, rating: currentRating });
    if (currentRating > ratings[bestMatchIndex].rating) {
      bestMatchIndex = i;
    }
  }

  const bestMatch = ratings[bestMatchIndex];
  return { ratings, bestMatch, bestMatchIndex };
}

function areArgsValid(mainString, targets, keySelector) {
  if (typeof mainString !== 'string') return false;
  if (!Array.isArray(targets)) return false;
  if (!targets.length) return false;
  if (keySelector) {
    if (typeof keySelector !== 'function') return false;
    if (targets.find((item) => typeof keySelector(item) !== 'string')) return false;
    return true;
  }
  if (targets.find((s) => typeof s !== 'string')) return false;
  return true;
}

export default { compareTwoStrings, findBestMatch };
