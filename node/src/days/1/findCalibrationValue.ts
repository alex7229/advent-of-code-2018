export type FindCalibrationValue = (input: string) => number;

const findCalibrationValue: FindCalibrationValue = (input) => {
  const digits = input.replace(/([^\d])/g, "");
  if (digits.length === 0) {
    throw new Error("Cannot parse line for calibration");
  }
  const first = digits[0];
  const last = digits[digits.length - 1];

  return parseInt(first + last);
};

export default findCalibrationValue;
