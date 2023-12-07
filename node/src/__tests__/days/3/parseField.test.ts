import { parseField, Field } from "../../../days/3/parseField";

it("should parse field correctly", () => {
  const input = `4.
              .*`;
  const field: Field = [
    [
      { type: "digit", value: 4, coordinates: { column: 0, row: 0 } },
      { type: "empty", coordinates: { column: 1, row: 0 } },
    ],
    [
      { type: "empty", coordinates: { column: 0, row: 1 } },
      { type: "symbol", value: "*", coordinates: { column: 1, row: 1 } },
    ],
  ];
  expect(parseField(input)).toEqual(field);
});
