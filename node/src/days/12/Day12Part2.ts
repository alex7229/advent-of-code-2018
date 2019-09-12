import { Solve } from "../10/Day10Part1";
import parsePots from "./parsePots";
import findPotsSum from "./findPotsSum";
import addEmptySidePots from "./addEmptySidePots";
import elapseGeneration from "./elapseGeneration";

const solve: Solve = input => {
  const { initialState, growCombinations } = parsePots(input);

  let potsResult = initialState;
  let potsSumBefore = findPotsSum(initialState);
  let potsSumAfter = findPotsSum(potsResult);
  let sumDifference = potsSumAfter - potsSumBefore;

  const iterations = 50 * 10 ** 9;

  for (let i = 0; i < iterations; i += 1) {
    potsResult = addEmptySidePots(potsResult);
    potsResult = elapseGeneration(potsResult, growCombinations);
    potsSumBefore = potsSumAfter;
    potsSumAfter = findPotsSum(potsResult);
    const currentDifference = potsSumAfter - potsSumBefore;
    if (currentDifference === sumDifference) {
      potsSumAfter += currentDifference * (iterations - i - 1);
      break;
    }
    sumDifference = currentDifference;
  }
  return potsSumAfter;
};

export default solve;
