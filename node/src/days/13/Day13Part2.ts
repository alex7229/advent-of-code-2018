import { Solve } from "../10/Day10Part1";
import parseField from "./parseField";
import moveCarts from "./moveCarts";
import removeBrokenCarts from "./removeBrokenCarts";

const solve: Solve = input => {
  const { field, carts } = parseField(input);
  let movedCarts = carts;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    movedCarts = removeBrokenCarts(moveCarts(movedCarts, field));
    if (movedCarts.length === 1) {
      return `${movedCarts[0].position.x},${movedCarts[0].position.y}`;
    }
  }
};

export default solve;
