import { parseSequence } from "../../../days/1/parseSequence";

it("should parse sequence value for provided strings", () => {
  expect(parseSequence("1abc2", true)).toBe("12");
  expect(parseSequence("pqr3stu8vwx", true)).toBe("38");
  expect(parseSequence("a1b2c3d4e5f", true)).toBe("12345");
  expect(parseSequence("treb7uchet", true)).toBe("7");
});

it("should parse sequence value for provided strings, including 'one', 'two', etc", () => {
  expect(parseSequence("two1nine", false)).toBe("219");
  expect(parseSequence("eightwothree", false)).toBe("823");
  expect(parseSequence("abcone2threexyz", false)).toBe("123");
  expect(parseSequence("xtwone3four", false)).toBe("2134");
  expect(parseSequence("4nineeightseven2", false)).toBe("49872");
  expect(parseSequence("zoneight234", false)).toBe("18234");
  expect(parseSequence("7pqrstsixteen", false)).toBe("76");
});

it("should work with overlapping symbols", () => {
  expect(parseSequence("5twone", false)).toBe("521");
});
