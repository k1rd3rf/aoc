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

const [first, second, third] = data;

console.log("part 1", first);
console.log(
  "part 2",
  [first, second, third].reduce((a, b) => a + b, 0)
);
