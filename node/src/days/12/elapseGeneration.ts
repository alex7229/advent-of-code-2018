import { Pot } from "./getInitialPotsFromString";
import { GrowCombination } from "./parsePots";
import arePotsFilledTheSame from "./arePotsFilledTheSame";

type ElapseGeneration = (
  pots: ReadonlyArray<Pot>,
  growCombinations: ReadonlyArray<GrowCombination>
) => ReadonlyArray<Pot>;

const elapseGeneration: ElapseGeneration = (pots, growCombinations) => {
  const resultPots: Pot[] = [pots[0], pots[1]];
  for (let position = 2; position < pots.length - 2; position += 1) {
    const currentPots = [
      pots[position - 2],
      pots[position - 1],
      pots[position],
      pots[position + 1],
      pots[position + 2]
    ];
    const emptyResultCombination = {
      before: [],
      after: { isFilled: false, position: 2 }
    };
    let currentCombination = growCombinations.find(growCombination =>
      arePotsFilledTheSame(growCombination.before, currentPots)
    );
    if (!currentCombination) {
      currentCombination = emptyResultCombination;
    }
    resultPots.push({
      isFilled: currentCombination.after.isFilled,
      position: pots[position].position
    });
  }
  resultPots.push(pots[pots.length - 2], pots[pots.length - 1]);
  return resultPots;
};

export default elapseGeneration;
