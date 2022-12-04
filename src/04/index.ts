import { readFileSync } from "fs";
import { resolve } from "path";

const getAbsolutePath = (relativePath) => resolve(__dirname, relativePath);

const inputs = readFileSync(getAbsolutePath("inputs.txt"), "utf8");

const numberRange = (size, startAt = 0) => [...Array(size).keys()].map((i) => i + startAt);
const range = (n: { from: number; to: number }) => numberRange(n.to - n.from + 1, n.from);

const data = inputs
  .split(/\n/)
  .map((l) => l.match("(\\d+)-(\\d+),(\\d+)-(\\d+)"))
  .map(([_, a1, a2, b1, b2]) => ({
    a: {
      from: parseInt(a1, 10),
      to: parseInt(a2, 10),
    },
    b: {
      from: parseInt(b1, 10),
      to: parseInt(b2, 10),
    },
  }))
  .filter(({ a, b }) => {
    const aRange = range(a);
    const bRange = range(b);

    const aInB = bRange.includes(a.from) && bRange.includes(a.to);
    const bInA = aRange.includes(b.from) && aRange.includes(b.to);

    return bInA || aInB;
  }).length;

console.log("part 1", data);
