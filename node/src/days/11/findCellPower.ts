import { Position } from "../10/parseLightPoints";

type FindCellPower = (position: Position, serialNumber: number) => number;

const findCellPower: FindCellPower = ({ x, y }, serialNumber) => {
  const rackId = x + 10;
  const multipliedPower = (rackId * y + serialNumber) * rackId;
  const hundredsCount = Math.floor(multipliedPower / 100);
  const hundredthDigit = hundredsCount % 10;
  return hundredthDigit - 5;
};

export default findCellPower;
