import { writeFileSync } from "fs";
import { cloneDeep } from "lodash";
import { Unit, Battlefield } from "./parseBattlefield";

type DrawUnits = (battlefield: Battlefield, units: ReadonlyArray<Unit>) => void;

type ExtendedCell = "wall" | "cavern" | "goblin" | "elf";
type ExtendedBattlefield = ExtendedCell[][];

const drawUnits: DrawUnits = (battlefield, units) => {
  const field: ExtendedBattlefield = cloneDeep(
    battlefield
  ) as ExtendedBattlefield;
  units.forEach(unit => {
    field[unit.position.row][unit.position.column] = unit.type;
  });
  const stringField = field
    .map(row =>
      row
        .map(cell => {
          if (cell === "wall") {
            return "#";
          }
          if (cell === "cavern") {
            return ".";
          }
          if (cell === "goblin") {
            return "G";
          }
          return "E";
        })
        .join("")
    )
    .join("\n");
  writeFileSync("./fileAnswer.txt", stringField);
};

export default drawUnits;
