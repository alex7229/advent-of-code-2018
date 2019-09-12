import { Position } from "../10/parseLightPoints";

export type Cell = "-" | "|" | "/" | "\\" | "+" | " ";
type Row = Cell[];
export type Field = Row[];
export type Direction = "left" | "right" | "up" | "down";
export type IntersectionTurn = "left" | "right" | "straight";
export interface Cart {
  readonly position: Position;
  readonly direction: Direction;
  readonly lastIntersection: IntersectionTurn | null;
}
interface FieldData {
  readonly field: Field;
  readonly carts: Cart[];
}

type ParseField = (input: string) => FieldData;

const parseField: ParseField = input => {
  const carts: Cart[] = [];
  const field: Field = input.split("\n").map((rowString, rowNumber) =>
    rowString.split("").map((mapSymbol, columnNumber) => {
      if (
        mapSymbol === "-" ||
        mapSymbol === "|" ||
        mapSymbol === "/" ||
        mapSymbol === "\\" ||
        mapSymbol === "+" ||
        mapSymbol === " "
      ) {
        return mapSymbol;
      }
      if (mapSymbol === ">") {
        carts.push({
          position: { x: columnNumber, y: rowNumber },
          direction: "right",
          lastIntersection: null
        });
        return "-";
      }
      if (mapSymbol === "<") {
        carts.push({
          position: { x: columnNumber, y: rowNumber },
          direction: "left",
          lastIntersection: null
        });
        return "-";
      }
      if (mapSymbol === "^") {
        carts.push({
          position: { x: columnNumber, y: rowNumber },
          direction: "up",
          lastIntersection: null
        });
        return "|";
      }
      if (mapSymbol === "v") {
        carts.push({
          position: { x: columnNumber, y: rowNumber },
          direction: "down",
          lastIntersection: null
        });
        return "|";
      }
      throw new Error(`unrecognizable symbol -> ${mapSymbol}`);
    })
  );
  return { field, carts };
};

export default parseField;
