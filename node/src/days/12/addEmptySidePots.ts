import { cloneDeep } from "lodash";
import { Pot } from "./getInitialPotsFromString";

type AddEmptySidePots = (pots: Pot[]) => Pot[];

const addEmptySidePots: AddEmptySidePots = pots => {
  const potsCopy = cloneDeep(pots);
  while (!potsCopy[0].isFilled) {
    potsCopy.shift();
  }
  while (!potsCopy[potsCopy.length - 1].isFilled) {
    potsCopy.pop();
  }
  const leftMostPot = potsCopy[0].position;
  const rightMostPot = potsCopy[potsCopy.length - 1].position;
  for (let i = 1; i <= 5; i += 1) {
    potsCopy.unshift({ isFilled: false, position: leftMostPot - i });
    potsCopy.push({ isFilled: false, position: rightMostPot + i });
  }
  return potsCopy;
};

export default addEmptySidePots;
