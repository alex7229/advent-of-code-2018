import * as dotenv from "dotenv";
import * as fs from "fs";

dotenv.config();

const day = process.env.DAY;
const part = process.env.PART;
const useTestData = process.env.USE_TEST_DATA;

const dataPath = `${__dirname}/../src/days/${day}/input${
  useTestData ? ".test" : ""
}.txt`;
const solvePath = `./days/${day}/Day${day}Part${part}`;

const data = fs.readFileSync(dataPath, "utf-8");
const answer = require(solvePath).default(data);

console.log(answer);
