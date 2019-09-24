export type GetNextRecipesScore = (
  scores: ReadonlyArray<number>
) => ReadonlyArray<number>;

const getNextRecipesScore: GetNextRecipesScore = scores =>
  scores
    .reduce((totalScore, currentScore) => totalScore + currentScore, 0)
    .toString()
    .split("")
    .map(symbol => parseInt(symbol, 10));

export default getNextRecipesScore;
