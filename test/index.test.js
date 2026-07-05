import { test } from 'node:test';
import assert from 'node:assert';
import stringSimilarity, { compareTwoStrings, findBestMatch } from '../index.js';

const BAD_ARGS = /Bad arguments/;

// --- compareTwoStrings: golden данные из оригинального suite (совместимость формулы) ---

test('compareTwoStrings golden values', () => {
  const cases = [
    ['french', 'quebec', 0],
    ['france', 'france', 1],
    ['fRaNce', 'france', 0.2],
    ['healed', 'sealed', 0.8],
    ['web applications', 'applications of the web', 0.7878787878787878],
    ['this will have a typo somewhere', 'this will huve a typo somewhere', 0.92],
    [
      'Olive-green table for sale, in extremely good condition.',
      'For sale: table in very good  condition, olive green in colour.',
      0.6060606060606061,
    ],
    ['this has one extra word', 'this has one word', 0.7741935483870968],
    ['a', 'a', 1],
    ['a', 'b', 0],
    ['', '', 1],
    ['a', '', 0],
    ['', 'a', 0],
    ['apple event', 'apple    event', 1],
    ['iphone', 'iphone x', 0.9090909090909091],
  ];
  for (const [a, b, expected] of cases) {
    assert.equal(compareTwoStrings(a, b), expected, `${a} / ${b}`);
  }
});

// --- findBestMatch (порт) ---

test('findBestMatch returns object with ratings/bestMatch/bestMatchIndex', () => {
  const out = findBestMatch('healed', ['edward', 'sealed', 'theatre']);
  assert.equal(out.ratings.length, 3);
  assert.equal(out.bestMatch.target, 'sealed');
  assert.equal(out.bestMatchIndex, 1);
  assert.equal(out.bestMatch.rating, 0.8);
});

test('findBestMatch throws Bad arguments on invalid input', () => {
  assert.throws(() => findBestMatch(), BAD_ARGS);
  assert.throws(() => findBestMatch(''), BAD_ARGS);
  assert.throws(() => findBestMatch('x', []), BAD_ARGS);
  assert.throws(() => findBestMatch('x', [1, 2]), BAD_ARGS);
  assert.throws(() => findBestMatch('x', 'not-array'), BAD_ARGS);
});

// --- фиксы форка ---

test('#125: findBestMatch with keySelector over an array of objects', () => {
  const targets = [
    { id: 1, name: 'edward' },
    { id: 2, name: 'sealed' },
    { id: 3, name: 'theatre' },
  ];
  const out = findBestMatch('healed', targets, (t) => t.name);
  assert.equal(out.bestMatch.target.id, 2); // target keeps the original object
  assert.equal(out.bestMatch.rating, 0.8);
  assert.equal(out.bestMatchIndex, 1);
});

test('#125: keySelector must be a function and yield strings', () => {
  assert.throws(() => findBestMatch('x', [{ v: 1 }], (t) => t.v), BAD_ARGS);
  assert.throws(() => findBestMatch('x', [{ v: 'a' }], 'not-fn'), BAD_ARGS);
});

test('default export exposes both functions (CJS-compatible shape)', () => {
  assert.equal(typeof stringSimilarity.compareTwoStrings, 'function');
  assert.equal(typeof stringSimilarity.findBestMatch, 'function');
  assert.equal(stringSimilarity.compareTwoStrings('france', 'france'), 1);
});
