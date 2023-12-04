import findCalibrationValue, {
  FindCalibrationValue,
} from "./findCalibrationValue";

type Solve = (input: string) => number;
type SolveFactory = (findCalibrationValue: FindCalibrationValue) => Solve;

const solveFactory: SolveFactory = (findCalibrationValue) => (input) => {
  const lines = input.split("\n");
  debugger;
  return lines.reduce((total, currentLine) => {
    return total + findCalibrationValue(currentLine, true);
  }, 0);
};

export default solveFactory(findCalibrationValue);
