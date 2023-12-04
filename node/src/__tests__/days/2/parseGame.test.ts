import { parseGame } from "../../../days/2/parseGame";

it("should parse games correctly", () => {
  expect(
    parseGame(`Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green`)
  ).toEqual({
    id: 1,
    rounds: [
      { red: 4, green: 0, blue: 3 },
      { red: 1, green: 2, blue: 6 },
      { red: 0, green: 2, blue: 0 },
    ],
  });

  expect(
    parseGame(
      `Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red`
    )
  ).toEqual({
    id: 4,
    rounds: [
      { red: 3, green: 1, blue: 6 },
      { red: 6, green: 3, blue: 0 },
      { red: 14, green: 3, blue: 15 },
    ],
  });
});
