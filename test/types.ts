// Компилируется в CI (npm run test-types).
import stringSimilarity, { compareTwoStrings, findBestMatch } from '../index.js';

const rating: number = compareTwoStrings('healed', 'sealed');

const strMatch = findBestMatch('healed', ['edward', 'sealed']);
const best: string = strMatch.bestMatch.target;
const idx: number = strMatch.bestMatchIndex;

// #125: keySelector over objects — target keeps the object type.
interface Item {
  id: number;
  name: string;
}
const items: Item[] = [
  { id: 1, name: 'edward' },
  { id: 2, name: 'sealed' },
];
const objMatch = findBestMatch('healed', items, (i) => i.name);
const bestId: number = objMatch.bestMatch.target.id;

// default export shape
const r2: number = stringSimilarity.compareTwoStrings('a', 'b');

void [rating, best, idx, bestId, r2];
