import { Point } from "./parseLightPoints";
import findFieldLimits from "./findFieldLimits";

type FindFieldArea = (points: ReadonlyArray<Point>) => number;

const findFieldArea: FindFieldArea = points => {
  const { topLeftCorner, bottomRightCorner } = findFieldLimits(points);
  return (
    (bottomRightCorner.x - topLeftCorner.x) *
    (bottomRightCorner.y - topLeftCorner.y)
  );
};

export default findFieldArea;
