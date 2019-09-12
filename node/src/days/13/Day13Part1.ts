import { Solve } from "../10/Day10Part1";
import parseField from "./parseField";
import moveCarts from "./moveCarts";
import findCrash from "./findCrash";

const solve: Solve = input => {
  const { field, carts } = parseField(input);
  let movedCarts = carts;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    movedCarts = moveCarts(movedCarts, field);
    const crashPosition = findCrash(movedCarts);
    if (crashPosition) {
      return `${crashPosition.x},${crashPosition.y}`;
    }
  }
};

export default solve;
