import { cookEnoughRecipesPartTwoFactory } from "../../../days/14/cookEnoughRecipesPartTwo";

it("should find pattern immediately", () => {
  expect(
    cookEnoughRecipesPartTwoFactory(jest.fn())([3, 7, 1, 2], [0, 1], "71")
  ).toEqual([3, 7, 1, 2]);
});

it("should find pattern after few tries", () => {
  const initialRecipes = [3, 7];
  const initialElvesPositions = [0, 1];
  const cookOneRecipeMock = jest
    .fn()
    .mockReturnValueOnce({ recipes: [3, 7, 0], elvesPositions: [0, 1] })
    .mockReturnValueOnce({
      recipes: [3, 7, 0, 2, 5, 6],
      elvesPositions: [2, 1]
    });
  expect(
    cookEnoughRecipesPartTwoFactory(cookOneRecipeMock)(
      initialRecipes,
      initialElvesPositions,
      "025"
    )
  ).toEqual([3, 7, 0, 2, 5, 6]);
});
