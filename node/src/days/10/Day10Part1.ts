import parseLightPoints from "./parseLightPoints";
import elapseOneSecond from "./elapseOneSecond";
import findFieldArea from "./findFieldArea";
import drawPoints from "./drawPoints";

type Solve = (input: string) => string;

const solve: Solve = input => {
  let previousPoints = parseLightPoints(input);
  let previousArea = findFieldArea(previousPoints);

  let currentPoints = elapseOneSecond(previousPoints);
  let currentArea = findFieldArea(currentPoints);

  while (currentArea < previousArea) {
    // field is decreasing in size
    // when it stop decreasing -> the word should appear
    previousPoints = currentPoints;
    previousArea = currentArea;

    currentPoints = elapseOneSecond(previousPoints);
    currentArea = findFieldArea(currentPoints);
  }

  drawPoints(previousPoints);

  return "check the fileAnswer.txt for the word";
};

export default solve;
