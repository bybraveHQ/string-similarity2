export interface Rating {
  target: string;
  rating: number;
}

export interface BestMatch {
  ratings: Rating[];
  bestMatch: Rating;
  bestMatchIndex: number;
}

export interface RatingOf<T> {
  target: T;
  rating: number;
}

export interface BestMatchOf<T> {
  ratings: RatingOf<T>[];
  bestMatch: RatingOf<T>;
  bestMatchIndex: number;
}

/** Similarity rating (0..1) between two strings (Dice coefficient). */
export function compareTwoStrings(first: string, second: string): number;

/** Rate `mainString` against an array of strings. */
export function findBestMatch(mainString: string, targetStrings: string[]): BestMatch;
/** Rate `mainString` against an array of objects via `keySelector` (#125). */
export function findBestMatch<T>(
  mainString: string,
  targets: T[],
  keySelector: (item: T) => string
): BestMatchOf<T>;

declare const _default: {
  compareTwoStrings: typeof compareTwoStrings;
  findBestMatch: typeof findBestMatch;
};
export default _default;
