import getInputs from "../helpers/getInputs";

const { input, fileName } = getInputs(__dirname);

const numberRange = (size, startAt = 0) => [...Array(size).keys()].map((i) => i + startAt);
const range = (n: { from: number; to: number }) => numberRange(n.to - n.from + 1, n.from);

const ranges = input
  .split(/\n/)
  .map((l) => l.match(/(\d+)-(\d+),(\d+)-(\d+)/))
  .map(([, a1, a2, b1, b2]) => ({
    a: {
      from: parseInt(a1, 10),
      to: parseInt(a2, 10),
    },
    b: {
      from: parseInt(b1, 10),
      to: parseInt(b2, 10),
    },
  }))
  .map(({ a, b }) => ({
    a: { ...a, range: range(a) },
    b: { ...b, range: range(b) },
  }));

const part1 = ranges.filter(({ a, b }) => {
  const aInB = b.range.includes(a.from) && b.range.includes(a.to);
  const bInA = a.range.includes(b.from) && a.range.includes(b.to);

  return bInA || aInB;
}).length;

const part2 = ranges.filter(({ a, b }) => {
  const aInB = b.range.includes(a.from) || b.range.includes(a.to);
  const bInA = a.range.includes(b.from) || a.range.includes(b.to);

  return bInA || aInB;
}).length;

console.group(`2022-day04 ${fileName}`);
console.log("part 1", part1);
console.log("part 2", part2);
console.groupEnd();
