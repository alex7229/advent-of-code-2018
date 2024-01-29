import { parseCards, Card } from "../../../days/4/parseCards";

it("should parse cards correctly", () => {
  const input = `Card 1: 41 | 83
  Card 21: 61 233 | 61 30`;
  const cards: Card[] = [
    { id: 1, actualNumbers: [83], winningNumbers: [41] },
    { id: 21, actualNumbers: [61, 30], winningNumbers: [61, 233] },
  ];
  expect(parseCards(input)).toEqual(cards);
});
