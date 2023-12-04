import findCalibrationValue from "../../../days/1/findCalibrationValue";

it("should find calibration value for provided strings", () => {
  expect(findCalibrationValue("1abc2")).toBe(12);
  expect(findCalibrationValue("pqr3stu8vwx")).toBe(38);
  expect(findCalibrationValue("a1b2c3d4e5f")).toBe(15);
  expect(findCalibrationValue("treb7uchet")).toBe(77);
});

it("should find calibration value for provided strings including actual values like `one`, `two`, etc", () => {
  expect(findCalibrationValue("two1nine", true)).toBe(29);
  expect(findCalibrationValue("eightwothree", true)).toBe(83);
  expect(findCalibrationValue("abcone2threexyz", true)).toBe(13);
  expect(findCalibrationValue("xtwone3four", true)).toBe(24);
  expect(findCalibrationValue("4nineeightseven2", true)).toBe(42);
  expect(findCalibrationValue("zoneight234", true)).toBe(14);
  expect(findCalibrationValue("7pqrstsixteen", true)).toBe(76);
});
