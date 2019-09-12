import { Solve } from "../10/Day10Part1";
import parsePots from "./parsePots";
import elapseFewGenerations from "./elapseFewGenerations";

const solve: Solve = input => {
  const { initialState, growCombinations } = parsePots(input);
  const grownPots = elapseFewGenerations(initialState, growCombinations, 20000);
  return grownPots.reduce((total, currentPot) => {
    if (!currentPot.isFilled) {
      return total;
    }
    return total + currentPot.position;
  }, 0);
};

export default solve;
