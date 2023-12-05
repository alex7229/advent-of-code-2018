import { calculateMaxCubesCount } from "../../../days/2/calculateMaxCubesCount";

it("should parse games correctly", () => {
  expect(
    calculateMaxCubesCount([
      { green: 8, blue: 6, red: 20 },
      { blue: 5, red: 4, green: 13 },
      { green: 5, red: 1, blue: 0 },
    ])
  ).toEqual({ red: 20, green: 13, blue: 6 });
});
