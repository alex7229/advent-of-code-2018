export type FindCalibrationValue = (
  input: string,
  parseNumbers?: boolean
) => number;

const findCalibrationValue: FindCalibrationValue = (
  input,
  parseNumbers = false
) => {
  let actualInput = input;
  if (parseNumbers) {
    actualInput = actualInput.replace(/(one)/g, "1");
    actualInput = actualInput.replace(/(two)/g, "2");
    actualInput = actualInput.replace(/(three)/g, "3");
    actualInput = actualInput.replace(/(four)/g, "4");
    actualInput = actualInput.replace(/(five)/g, "5");
    actualInput = actualInput.replace(/(six)/g, "6");
    actualInput = actualInput.replace(/(seven)/g, "7");
    actualInput = actualInput.replace(/(eight)/g, "8");
    actualInput = actualInput.replace(/(nine)/g, "9");
  }
  const digits = actualInput.replace(/([^\d])/g, "");
  if (digits.length === 0) {
    throw new Error("Cannot parse line for calibration");
  }
  const first = digits[0];
  const last = digits[digits.length - 1];

  return parseInt(first + last);
};

export default findCalibrationValue;
