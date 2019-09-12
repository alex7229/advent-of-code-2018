import { Pot } from "./getInitialPotsFromString";
import { GrowCombination } from "./parsePots";
import addEmptySidePots from "./addEmptySidePots";
import elapseGeneration from "./elapseGeneration";

type ElapseFewGenerations = (
  pots: Pot[],
  growCombinations: GrowCombination[],
  generationsNumber: number
) => Pot[];

const elapseFewGenerations: ElapseFewGenerations = (
  pots,
  growCombinations,
  generationsNumber
) => {
  let potsResult = pots;
  for (let i = 0; i < generationsNumber; i += 1) {
    potsResult = addEmptySidePots(potsResult);
    potsResult = elapseGeneration(potsResult, growCombinations);
  }
  return potsResult;
};

export default elapseFewGenerations;
