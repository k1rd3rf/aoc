import getInputs from "../../helpers/getInputs";

const { input, fileName } = getInputs(__dirname);

const data = input
  .split(/\n\n/)
  .map((elfRow) => elfRow.split(/\n/).map((n) => parseInt(n, 10)))
  .map((foods) => foods.reduce((a, b) => a + b, 0))
  .sort()
  .reverse();

const [first, second, third] = data;
const part1 = first;
const part2 = [first, second, third].reduce((a, b) => a + b, 0);

console.group(`2022-day01 ${fileName}`);
console.log("part 1", part1);
console.log("part 2", part2);
console.groupEnd();
