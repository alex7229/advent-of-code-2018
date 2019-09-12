import { Solve } from "../10/Day10Part1";
import parsePots from "./parsePots";
import elapseFewGenerations from "./elapseFewGenerations";
import findPotsSum from "./findPotsSum";

const solve: Solve = input => {
  const { initialState, growCombinations } = parsePots(input);
  const grownPots = elapseFewGenerations(initialState, growCombinations, 20);
  return findPotsSum(grownPots);
};

export default solve;
