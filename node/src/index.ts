import * as dotenv from "dotenv";
import * as fs from "fs";

dotenv.config();

const day = process.env.DAY;
const part = process.env.PART;
const useTestData = process.env.USE_TEST_DATA;

const testPrefix = useTestData === "true" ? ".test" : "";
const dataPath = `${__dirname}/../src/days/${day}/input${testPrefix}.txt`;
const solvePath = `./days/${day}/Day${day}Part${part}`;

const data = fs.readFileSync(dataPath, "utf-8");
// eslint-disable-next-line import/no-dynamic-require
const answer = require(solvePath).default(data);

// eslint-disable-next-line no-console
console.log(answer);
