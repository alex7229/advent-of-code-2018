import getInitialPotsFromString, { Pot } from "./getInitialPotsFromString";

export interface GrowCombination {
  readonly before: ReadonlyArray<Pot>;
  readonly after: Pot;
}

interface PotsData {
  readonly initialState: ReadonlyArray<Pot>;
  readonly growCombinations: ReadonlyArray<GrowCombination>;
}

type ParsePots = (input: string) => PotsData;

const parsePots: ParsePots = input => {
  const initialStateRegExp = /initial state: ([#.]+)/;
  const initialStateMatch = input.match(initialStateRegExp);
  if (initialStateMatch === null) {
    throw new Error("cannot parse pots initial state");
  }

  const combinationsRegExp = /([.#]{5,}) => ([.#])/g;
  const growCombinations = [...input.matchAll(combinationsRegExp)].map(
    match => ({
      before: getInitialPotsFromString(match[1]),
      after: { position: 2, isFilled: match[2] === "#" }
    })
  );
  return {
    initialState: getInitialPotsFromString(initialStateMatch[1]),
    growCombinations
  };
};

export default parsePots;
