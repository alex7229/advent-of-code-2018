import findCalibrationValue, {
  FindCalibrationValue,
} from "./findCalibrationValue";

type Solve = (input: string) => number;
type SolveFactory = (findCalibrationValue: FindCalibrationValue) => Solve;

const solveFactory: SolveFactory = (findCalibrationValue) => (input) => {
  const lines = input.split("\n");
  return lines.reduce(
    (total, currentLine) => (total += findCalibrationValue(currentLine)),
    0
  );
};

export default solveFactory(findCalibrationValue);
