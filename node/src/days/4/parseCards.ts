export type Card = {
  id: number;
  winningNumbers: number[];
  actualNumbers: number[];
};

const parseNumbers = (numbersInput: string): number[] => {
  const numbers = numbersInput.split(" ");
  return numbers.map((n) => parseInt(n, 10)).filter((v) => !Number.isNaN(v));
};

export const parseCards = (input: string): Card[] => {
  return input.split("\n").map((row) => {
    const cardMatch = row.match(/Card (\d+):/);
    const cardID = cardMatch ? parseInt(cardMatch[1], 10) : 0;

    const [winningNumbersInput, actualNumbersInput] = row.split("|");

    return {
      id: cardID,
      actualNumbers: parseNumbers(actualNumbersInput),
      winningNumbers: parseNumbers(winningNumbersInput).slice(1),
    };
  });
};
