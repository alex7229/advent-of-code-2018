import { cookEnoughRecipesFactory } from "../../../days/14/cookEnoughRecipes";

it("should cook chocolate until enough recipes are produced", () => {
  const cookOneRecipeMock = jest
    .fn()
    .mockReturnValueOnce({ recipes: [1, 4], elvesPositions: [0, 1] })
    .mockReturnValueOnce({ recipes: [1, 3, 6, 2], elvesPositions: [0, 2] })
    .mockReturnValueOnce({ recipes: [1, 3, 6, 2, 11], elvesPositions: [3, 1] });
  const initialPositions = [0, 1];
  const initialRecipes = [1, 2];
  expect(
    cookEnoughRecipesFactory(cookOneRecipeMock)(
      initialRecipes,
      initialPositions,
      "5"
    )
  ).toEqual([1, 3, 6, 2, 11]);
  expect(cookOneRecipeMock.mock.calls.length).toBe(3);
  expect(cookOneRecipeMock.mock.calls[2][0]).toEqual([1, 3, 6, 2]);
  expect(cookOneRecipeMock.mock.calls[2][1]).toEqual([0, 2]);
});
