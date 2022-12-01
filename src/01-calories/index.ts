import { readFileSync } from "fs";
import { resolve } from "path";

const getAbsolutePath = (relativePath) => resolve(__dirname, relativePath);

const inputs = readFileSync(getAbsolutePath("inputs.txt"), "utf8");

const data = inputs
  .split(/\n\n/)
  .map((elfRow) => elfRow.split(/\n/).map((n) => parseInt(n, 10)))
  .map((foods) => foods.reduce((a, b) => a + b, 0))
  .sort()
  .reverse();

console.log(data[0]);
console.log(data[0] + data[1] + data[2]);
