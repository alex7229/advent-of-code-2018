import elapseOneSecond, { ElapseOneSecond } from "./elapseOneSecond";
import { solveFactory, Solve } from "./Day10Part1";

const solve: Solve = input => {
  let secondsPassed = 0;
  const elapseOneSecondWrapper: ElapseOneSecond = points => {
    secondsPassed += 1;
    return elapseOneSecond(points);
  };
  solveFactory(elapseOneSecondWrapper)(input);
  return secondsPassed - 1;
};

export default solve;
