import { Solve } from "../10/Day10Part1";
import parseGround from "./parseGround";
import { flatten } from "lodash";
import dripAllWater from "./dripAllWater";

const solve: Solve = (input) => {
  const field = parseGround(input);
  dripAllWater(field);
  return flatten(field).reduce(
    (total, currentCell) =>
      currentCell.type === "water" || currentCell.type === "wet sand"
        ? total + 1
        : total,
    0
  );
};

export default solve;
