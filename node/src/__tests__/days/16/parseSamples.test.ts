import parseSamples from "../../../days/16/parseSamples";

it("should parse few samples", () => {
  const input = `Before: [0, 1, 3, 3]
    12 1 0 3
    After:  [0, 1, 3, 1]
    
    Before: [1, 0, 2, 3]
    9 0 2 2
    After:  [1, 0, 0, 3]`;
  expect(parseSamples(input)).toEqual([
    {
      before: [0, 1, 3, 3],
      after: [0, 1, 3, 1],
      instruction: {
        code: 12,
        firstInput: 1,
        secondInput: 0,
        output: 3
      }
    },
    {
      before: [1, 0, 2, 3],
      after: [1, 0, 0, 3],
      instruction: {
        code: 9,
        firstInput: 0,
        secondInput: 2,
        output: 2
      }
    }
  ]);
});

it("should ignore test programm from the puzzle input", () => {
  const input = `Before: [3, 2, 0, 3]
  11 2 0 2
  After:  [3, 2, 1, 3]
  
  
  
  9 1 1 1
  9 1 1 2
  9 3 3 3
  0 3 2 1
  2 1 3 1`;
  expect(parseSamples(input)).toEqual([
    {
      before: [3, 2, 0, 3],
      after: [3, 2, 1, 3],
      instruction: {
        code: 11,
        firstInput: 2,
        secondInput: 0,
        output: 2
      }
    }
  ]);
});
