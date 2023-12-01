import getInputs from "../../helpers/getInputs";
import rotateMatrix from "../../helpers/rotateMatrix";
import range from "../../helpers/numberRange";

const { input, fileName } = getInputs(__dirname);

const [instructions, moves] = input.split(/\n\n/);

const initState = instructions.split(/\n/).map((row) =>
  row
    .split(/(\w{3}|.{4})/g)
    .flat()
    .filter((r) => r !== "")
    .map((r) => r.replaceAll("[", "").replaceAll("]", ""))
    .map((r) => r.trim())
);

const cols = parseInt(initState.at(-1).at(-1), 10);
const matrix = initState.slice(0, initState.length - 1).map((r) => range(cols).map((a) => r[a]));

const rotated = rotateMatrix(matrix).map((row) => row.filter((i) => !!i));

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
      return [...prev.slice(0, to), [...prev[to], ...pops], ...prev.slice(to + 1, prev.length)];
    },
    [...rotated.map((r) => [...r])]
  )
  .map((r) => r.at(-1))
  .join("");

console.group(`2022-day05 ${fileName}`);
console.log("part 1", part1);
console.log("part 2", part2);
console.groupEnd();
