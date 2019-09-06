export interface Position {
  readonly x: number;
  readonly y: number;
}

interface Velocity {
  readonly x: number;
  readonly y: number;
}

export interface Point {
  readonly position: Position;
  readonly velocity: Velocity;
}

type ParseLightPoints = (input: string) => Point[];

const parseLightPoints: ParseLightPoints = input => {
  return input.split("\n").map(row => {
    const regExp = /position=<(\s*-?\d+),(\s*-?\d+)> velocity=<(\s*-?\d+),(\s*-?\d+)>/;
    const match = row.match(regExp);
    if (!match) {
      throw new Error("failed to parse input");
    }
    return {
      position: { x: parseInt(match[1], 10), y: parseInt(match[2], 10) },
      velocity: { x: parseInt(match[3], 10), y: parseInt(match[4], 10) }
    };
  });
};

export default parseLightPoints;
