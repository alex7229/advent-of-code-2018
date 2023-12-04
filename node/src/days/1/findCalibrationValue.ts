import { parseSequence } from "./parseSequence";

export type FindCalibrationValue = (
  input: string,
  parseNumbers?: boolean
) => number;

const findCalibrationValue: FindCalibrationValue = (
  input,
  parseNumbers = false
) => {
  const parsedInput = parseSequence(input, !parseNumbers, "");
  const first = parsedInput[0];
  const last = parsedInput[parsedInput.length - 1];

  return parseInt(first + last);
};

export default findCalibrationValue;
