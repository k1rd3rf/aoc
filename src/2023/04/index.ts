import getInputs from "../../helpers/getInputs";

const { input, fileName } = getInputs(__dirname);

const getData = () =>
  input
    .split(/\n/)
    .map((s) => s.split(/Card\s+(\d+): (.*) \| (.*)/))
    .map(([, card, winning, numbers]) => ({ card, winning: winning.split(/\s+/), numbers: numbers.split(/\s+/) }));

console.group(`2023-day04 ${fileName}`);
console.log(
  "part 1",
  getData()
    .map(({ winning, numbers }) => {
      const wins = numbers.filter((n) => winning.includes(n));
      const points = wins.reduce((t) => (t || 0.5) * 2, 0);
      return { wins, points };
    })
    .reduce((total, { points }) => total + points, 0),
);
console.groupEnd();
