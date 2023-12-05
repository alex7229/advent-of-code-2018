import { findPossibleGames } from "../../../days/2/findPossibleGames";
import { Game } from "../../../days/2/parseGame";

it("should calculate possible games correctly", () => {
  const games: Game[] = [
    {
      id: 2,
      rounds: [
        { blue: 1, green: 2, red: 0 },
        { green: 3, blue: 4, red: 1 },
        { green: 1, blue: 1, red: 0 },
      ],
    },
    { id: 3, rounds: [{ green: 8, blue: 6, red: 20 }] },
  ];
  const configuration = {
    red: 12,
    green: 13,
    blue: 14,
  };
  expect(findPossibleGames(games, configuration)).toEqual([2]);
});
