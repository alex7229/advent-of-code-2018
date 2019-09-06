import { Point, Position } from "./parseLightPoints";

interface Limits {
  readonly topLeftCorner: Position;
  readonly bottomRightCorner: Position;
}

type FindFieldLimits = (points: Point[]) => Limits;

const findFieldLimits: FindFieldLimits = points => {
  const limits = {
    topLeftCorner: {
      x: Infinity,
      y: Infinity
    },
    bottomRightCorner: {
      x: -Infinity,
      y: -Infinity
    }
  };
  points.forEach(({ position }) => {
    const { x, y } = position;
    if (x < limits.topLeftCorner.x) {
      limits.topLeftCorner.x = x;
    }
    if (x > limits.bottomRightCorner.x) {
      limits.bottomRightCorner.x = x;
    }
    if (y < limits.topLeftCorner.y) {
      limits.topLeftCorner.y = y;
    }
    if (y > limits.bottomRightCorner.y) {
      limits.bottomRightCorner.y = y;
    }
  });
  return limits;
};

export default findFieldLimits;
