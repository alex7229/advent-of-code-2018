import elapseOneSecond, { ElapseOneSecond } from "./elapseOneSecond";
import { solveFactory } from "./Day10Part1";

const solve = (input: string) => {
  let secondsPassed = 0;
  const elapseOneSecondWrapper: ElapseOneSecond = points => {
    secondsPassed += 1;
    return elapseOneSecond(points);
  };
  solveFactory(elapseOneSecondWrapper)(input);
  return secondsPassed - 1;
};

export default solve;
