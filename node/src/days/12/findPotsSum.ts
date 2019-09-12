import { Pot } from "./getInitialPotsFromString";

type FindPotsSum = (pots: Pot[]) => number;

const findPotsSum: FindPotsSum = pots =>
  pots.reduce((total, currentPot) => {
    if (!currentPot.isFilled) {
      return total;
    }
    return total + currentPot.position;
  }, 0);

export default findPotsSum;
