import { FindGears, findGears } from "./findGears";
import {
  FindValidPartNumbers,
  findValidPartNumbers,
} from "./findValidPartNumbers";
import { ParseField, parseField } from "./parseField";

type Solve = (input: string) => number;
type SolveFactory = (
  parseField: ParseField,
  findValidPartNumbers: FindValidPartNumbers,
  findGears: FindGears
) => Solve;

const solveFactory: SolveFactory = (
  parseField,
  findValidPartNumbers,
  findGears
) => (input) => {
  const field = parseField(input);
  const gears = findGears(field, findValidPartNumbers);
  return gears.reduce(
    (total, currentGear) =>
      total + currentGear.ratios[0] * currentGear.ratios[1],
    0
  );
};

export default solveFactory(parseField, findValidPartNumbers, findGears);
