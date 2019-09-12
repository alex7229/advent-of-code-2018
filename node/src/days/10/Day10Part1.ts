import parseLightPoints from "./parseLightPoints";
import elapseOneSecond, { ElapseOneSecond } from "./elapseOneSecond";
import findFieldArea from "./findFieldArea";
import drawPoints from "./drawPoints";

export type Solve = (input: string) => string | number;

type SolveFactory = (elapseOneSecond: ElapseOneSecond) => Solve;

export const solveFactory: SolveFactory = elapseOneSecondFunc => input => {
  let previousPoints = parseLightPoints(input);
  let previousArea = findFieldArea(previousPoints);

  let currentPoints = elapseOneSecondFunc(previousPoints);
  let currentArea = findFieldArea(currentPoints);

  while (currentArea < previousArea) {
    // field is decreasing in size
    // when it stop decreasing -> the word should appear
    previousPoints = currentPoints;
    previousArea = currentArea;

    currentPoints = elapseOneSecondFunc(previousPoints);
    currentArea = findFieldArea(currentPoints);
  }

  drawPoints(previousPoints);

  return "check the fileAnswer.txt for the word";
};

export default solveFactory(elapseOneSecond);
