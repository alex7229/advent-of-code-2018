import * as fs from "fs";
import { Point } from "./parseLightPoints";
import findFieldLimits from "./findFieldLimits";

type DrawPoints = (points: ReadonlyArray<Point>) => void;

const drawPoints: DrawPoints = points => {
  const limits = findFieldLimits(points);
  const rowsCount = limits.bottomRightCorner.y - limits.topLeftCorner.y + 1;
  const columnsCount = limits.bottomRightCorner.x - limits.topLeftCorner.x + 1;
  const field = Array(rowsCount)
    .fill(".")
    .map(() => ".".repeat(columnsCount).split(""));
  // instead of working with negative positions, it is much easier to
  // assume that most negative point has 0,0 instead of -25,-17
  // (or whatever position it has)
  const relativePointsPoisitions = points.map(({ position }) => ({
    x: position.x - limits.topLeftCorner.x,
    y: position.y - limits.topLeftCorner.y
  }));
  relativePointsPoisitions.forEach(({ x, y }) => {
    field[y][x] = "#";
  });
  const fileField = field.map(row => row.join("")).join("\n");
  fs.writeFileSync("./fileAnswer.txt", fileField, "utf-8");
};

export default drawPoints;
