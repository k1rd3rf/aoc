import getInputs from "../../helpers/getInputs";

const { input, fileName } = getInputs(__dirname);

const data = input
  .split(/\n\n/)
  .map((elfRow) =>
    elfRow
      .split(/\n/)
      .map((n) =>
        Array.from(n)
          .map((x) => parseInt(x, 10))
          .filter((num) => !Number.isNaN(num)),
      )
      .map((nums) => [nums.at(0), nums.at(-1)]),
  )
  .map((nums) => nums.map((n) => n.join("")))
  .map((x) => x.map((y) => parseInt(y, 10)).reduce((a, b) => a + b, 0));

const part1 = data;

console.group(`2023-day01 ${fileName}`);
console.log("part 1", part1);
// console.log("part 2", part2);
console.groupEnd();
