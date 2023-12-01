import getInputs from "../../helpers/getInputs";

const { input, fileName } = getInputs(__dirname);

const part2Replacer = (row: string) =>
  row
    .replaceAll("one", "one1one")
    .replaceAll("two", "two2two")
    .replaceAll("three", "three3three")
    .replaceAll("four", "four4four")
    .replaceAll("five", "five5five")
    .replaceAll("six", "six6six")
    .replaceAll("seven", "seven7seven")
    .replaceAll("eight", "eight8eight")
    .replaceAll("nine", "nine9nine");

const getData = (replacer = (s): string => s) =>
  input
    .split(/\n\n/)
    .map((elfRow) =>
      elfRow
        .split(/\n/)
        .map(replacer)
        .map((n) =>
          Array.from(n)
            .map((x) => parseInt(x, 10))
            .filter((num) => !Number.isNaN(num)),
        )
        .map((nums) => [nums.at(0), nums.at(-1)]),
    )
    .map((nums) => nums.map((n) => n.join("")))
    .map((x) => x.map((y) => parseInt(y, 10)).reduce((a, b) => a + b, 0));

console.group(`2023-day01 ${fileName}`);
console.log("part 1", getData());
console.log("part 2", getData(part2Replacer));
console.groupEnd();
