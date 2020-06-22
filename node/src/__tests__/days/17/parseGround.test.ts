import parseGround, { Field } from "../../../days/17/parseGround";

it("should parse and remove empty sand fields", () => {
  const input = `x=499, y=1..3
    y=3, x=498..501`;
  const field: Field = [
    [
      { type: "sand", position: { column: 497, row: 0 } },
      { type: "sand", position: { column: 498, row: 0 } },
      { type: "sand", position: { column: 499, row: 0 } },
      { type: "spring", position: { column: 500, row: 0 } },
      { type: "sand", position: { column: 501, row: 0 } },
      { type: "sand", position: { column: 502, row: 0 } }
    ],
    [
      { type: "sand", position: { column: 497, row: 1 } },
      { type: "sand", position: { column: 498, row: 1 } },
      { type: "clay", position: { column: 499, row: 1 } },
      { type: "sand", position: { column: 500, row: 1 } },
      { type: "sand", position: { column: 501, row: 1 } },
      { type: "sand", position: { column: 502, row: 1 } }
    ],
    [
      { type: "sand", position: { column: 497, row: 2 } },
      { type: "sand", position: { column: 498, row: 2 } },
      { type: "clay", position: { column: 499, row: 2 } },
      { type: "sand", position: { column: 500, row: 2 } },
      { type: "sand", position: { column: 501, row: 2 } },
      { type: "sand", position: { column: 502, row: 2 } }
    ],
    [
      { type: "sand", position: { column: 497, row: 3 } },
      { type: "clay", position: { column: 498, row: 3 } },
      { type: "clay", position: { column: 499, row: 3 } },
      { type: "clay", position: { column: 500, row: 3 } },
      { type: "clay", position: { column: 501, row: 3 } },
      { type: "sand", position: { column: 502, row: 3 } }
    ]
  ];
  expect(parseGround(input)).toEqual(field);
});
