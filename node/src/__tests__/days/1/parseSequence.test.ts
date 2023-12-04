import { parseSequence } from "../../../days/1/parseSequence";

it.skip("should parse sequence value for provided strings", () => {
  expect(parseSequence("1abc2", true)).toBe("12");
  expect(parseSequence("pqr3stu8vwx", true)).toBe("38");
  expect(parseSequence("a1b2c3d4e5f", true)).toBe("12345");
  expect(parseSequence("treb7uchet", true)).toBe("7");
});

it("should parse sequence value for provided strings, including 'one', 'two', etc", () => {
  expect(parseSequence("two1nine", false)).toBe("219");
  expect(parseSequence("eightwothree", false)).toBe("83");
  expect(parseSequence("abcone2threexyz", false)).toBe("123");
  expect(parseSequence("xtwone3four", false)).toBe("234");
  expect(parseSequence("4nineeightseven2", false)).toBe("49872");
  expect(parseSequence("zoneight234", false)).toBe("1234");
  expect(parseSequence("7pqrstsixteen", false)).toBe("76");
});
