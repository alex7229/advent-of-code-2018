import { Solve } from "../10/Day10Part1";
import parseSamples from "./parseSamples";
import findPossibleOperationType from "./findPossibleOperation";

const solve: Solve = input => {
  const samples = parseSamples(input);
  return samples.filter(
    sample =>
      findPossibleOperationType(sample.before, sample.after, sample.instruction)
        .length >= 3
  ).length;
};

export default solve;
