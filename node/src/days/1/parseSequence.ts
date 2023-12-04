type ParseSequence = (
  input: string,
  digitsOnly: boolean,
  parsedDigits?: string
) => string;

export const parseSequence: ParseSequence = (
  input,
  digitsOnly,
  parsedDigits
) => {
  if (input.length === 0) {
    if (!parsedDigits || parsedDigits.length === 0) {
      throw new Error("Wasn't able to parse sequence");
    }
    return parsedDigits;
  }
  const firstPossibleDigit = input[0];
  const digitMatch = firstPossibleDigit.match(/\d/);
  if (digitMatch !== null) {
    return parseSequence(
      input.slice(1),
      digitsOnly,
      parsedDigits ? `${parsedDigits}${digitMatch[0]}` : digitMatch[0]
    );
  }
  if (digitsOnly) {
    return parseSequence(input.slice(1), digitsOnly, parsedDigits);
  }

  const nonDigitMatch = input.match(
    /^(one|two|three|four|five|six|seven|eight|nine)/g
  );
  if (nonDigitMatch !== null) {
    const matchedValue = nonDigitMatch[0];
    let matchedDigit: string = "1";
    if (matchedValue === "two") {
      matchedDigit = "2";
    } else if (matchedValue === "three") {
      matchedDigit = "3";
    } else if (matchedValue === "four") {
      matchedDigit = "4";
    } else if (matchedValue === "five") {
      matchedDigit = "5";
    } else if (matchedValue === "six") {
      matchedDigit = "6";
    } else if (matchedValue === "seven") {
      matchedDigit = "7";
    } else if (matchedValue === "eight") {
      matchedDigit = "8";
    } else if (matchedValue === "nine") {
      matchedDigit = "9";
    }
    return parseSequence(
      input.slice(matchedValue.length),
      digitsOnly,
      parsedDigits ? `${parsedDigits}${matchedDigit}` : matchedDigit
    );
  }
  return parseSequence(input.slice(1), digitsOnly, parsedDigits);
};
