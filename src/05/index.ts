import { readFileSync } from "fs";
import { resolve } from "path";

const getAbsolutePath = (relativePath) => resolve(__dirname, relativePath);

const inputs = readFileSync(getAbsolutePath("inputs.txt"), "utf8");

const [instructions, moves] = inputs.split(/\n\n/);

const initState = instructions.split(/\n/).map((row) =>
  row
    .split(/(\w{3}|.{4})/g)
    .flat()
    .filter((r) => r !== "")
    .map((r) => r.replaceAll("[", "").replaceAll("]", ""))
    .map((r) => r.trim())
);
const range = (size, add = 0) => [...new Array(size).keys()].map((i) => i + add);

const cols = parseInt(initState.at(-1).at(-1), 10);
const matrix = initState.slice(0, initState.length - 1).map((r) => range(cols).map((a) => r[a]));

const rot = matrix[0].map((val, index) => matrix.map((row) => row[index]).reverse());
const rotated = rot.map((row) => row.filter((i) => !!i));

const parsedMoves = moves.split(/\n/).map((move) => {
  const [, cnt, from, to] = move.match(/move (\d+) from (\d+) to (\d+)/);
  return { cnt: Number(cnt), from: Number(from) - 1, to: Number(to) - 1 };
});

const part1 = parsedMoves
  .reduce(
    (prev, { cnt, from, to }) =>
      range(cnt).reduce((p) => {
        p[to].push(p[from].pop());
        return p;
      }, prev),
    [...rotated.map((r) => [...r])]
  )
  .map((r) => r.at(-1))
  .join("");

const part2 = parsedMoves
  .reduce(
    (prev, { cnt, from, to }) => {
      const pops = range(cnt)
        .map(() => prev[from].pop())
        .reverse();
      prev[to] = [...prev[to], ...pops];
      return prev;
    },
    [...rotated.map((r) => [...r])]
  )
  .map((r) => r.at(-1))
  .join("");

console.log("part 1", part1);
console.log("part 2", part2);
