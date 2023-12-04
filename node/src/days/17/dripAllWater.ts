import { flatten, uniqWith, isEqual } from "lodash";
import { Field, Cell } from "./parseGround";
import dripWater from "./dripWater";
import getCellByPosition from "./getCellByPosition";
import drawField from "./drawField";

type DripAllWater = (field: Field) => void;
const dripAllWater: DripAllWater = (field) => {
  const springCell = getCellByPosition({ row: 0, column: 500 }, field);
  if (!springCell) throw new Error("Spring cell wasn`t found");
  let waterCells: Cell[] = [springCell];

  while (waterCells.length > 0) {
    const allWaterCells = flatten(
      waterCells.map((cell) => dripWater(cell.position, field))
    );
    waterCells = uniqWith(allWaterCells, isEqual);
    drawField(field);
  }
};

export default dripAllWater;
