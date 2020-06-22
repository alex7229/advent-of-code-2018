import { writeFileSync } from "fs";
import { Field } from "./parseGround";

type DrawField = (field: Field) => void;
const drawField: DrawField = field => {
  const fieldString: string = field
    .map(row =>
      row
        .map(cell => {
          if (cell.type === "clay") return "#";
          if (cell.type === "sand") return ".";
          if (cell.type === "spring") return "+";
          if (cell.type === "water") return "~";
          return "|";
        })
        .join("")
    )
    .join("\n");
  writeFileSync("./fileAnswer.txt", fieldString, "utf-8");
};

export default drawField;
