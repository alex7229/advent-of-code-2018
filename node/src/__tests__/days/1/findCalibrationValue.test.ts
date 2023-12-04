import findCalibrationValue from "../../../days/1/findCalibrationValue";

it("should find calibration value for provided strings", () => {
  expect(findCalibrationValue("1abc2")).toBe(12);
  expect(findCalibrationValue("pqr3stu8vwx")).toBe(38);
  expect(findCalibrationValue("a1b2c3d4e5f")).toBe(15);
  expect(findCalibrationValue("treb7uchet")).toBe(77);
});
