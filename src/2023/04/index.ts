import getInputs from "../../helpers/getInputs";

const { input, fileName } = getInputs(__dirname);

const getData = () =>
  input
    .split(/\n/)
    .map((s) => s.split(/Card\s+(\d+): (.*) \| (.*)/))
    .map(([, card, winning, numbers]) => ({ card, winning: winning.split(/\s+/), numbers: numbers.split(/\s+/) }));

console.group(`2023-day04 ${fileName}`);
const getMatches = () =>
  getData().map(({ card, winning, numbers }, index) => {
    const matches = numbers.filter((n) => winning.includes(n));
    const points = matches.reduce((t) => (t || 0.5) * 2, 0);
    return { card, winning, numbers, matches, points, wins: matches.length, index };
  });

console.log(
  "part 1",
  getMatches().reduce((total, { points }) => total + points, 0),
);

type Card = { wins: number; index: number };

const lookupWinners = (all: Card[], cards = all): Card[] =>
  cards.concat(
    cards.flatMap((c) => {
      if (c.wins) {
        const next = c.index + 1;
        return lookupWinners(all, all.slice(next, next + c.wins));
      }
      return [];
    }),
  );

console.log("part 2", lookupWinners(getMatches()).length);

console.groupEnd();
