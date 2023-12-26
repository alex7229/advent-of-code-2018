import {
  FindValidPartNumbers,
  findValidPartNumbers,
} from "./findValidPartNumbers";
import { ParseField, parseField } from "./parseField";

type Solve = (input: string) => number;
type SolveFactory = (
  parseField: ParseField,
  findValidPartNumbers: FindValidPartNumbers
) => Solve;

const solveFactory: SolveFactory = (parseField, findValidPartNumbers) => (
  input
) => {
  const field = parseField(input);
  const validNumbers = findValidPartNumbers(field);
  return validNumbers.reduce((total, current) => total + current, 0);
};

export default solveFactory(parseField, findValidPartNumbers);
