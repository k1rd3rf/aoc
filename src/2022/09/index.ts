import getInputs from "../../helpers/getInputs";
import numberRange from "../../helpers/numberRange";

const { input, fileName } = getInputs(__dirname);

type Direction = "U" | "D" | "R" | "L";
type Instruction = { dir: Direction; steps: number };

const instructions: Instruction[] = input.split(/\n/).map((r) => {
  const [dir, steps] = r.split(" ");
  return { dir: dir as Direction, steps: Number(steps) };
});

type Position = { r: number; c: number };
const initialState: Position = { r: 0, c: 0 };

const moveHead = ({ r, c }: Position, dir: Direction, steps = 1): Position => {
  switch (dir) {
    case "R":
      return { r, c: c + 1 };
    case "U":
      return { r: r + 1, c };
    case "L":
      return { r, c: c - 1 };
    case "D":
      return { r: r - 1, c };
    default:
      throw Error(`Unknown instruction: ${JSON.stringify({ dir, steps })}`);
  }
};

function moveInDirection(diff: number, newPos: Position, above: Direction, below: Direction) {
  if (diff > 0) return moveHead(newPos, above);
  if (diff < 0) return moveHead(newPos, below);
  return newPos;
}

const moveTailInCol = (cDiff: number, newPos: Position): Position => moveInDirection(cDiff, newPos, "L", "R");
const moveTailInRow = (rDiff: number, newPos: Position): Position => moveInDirection(rDiff, newPos, "D", "U");

const moveKnot = (head: Position, tail: Position): Position => {
  const rDiff = tail.r - head.r;
  const cDiff = tail.c - head.c;

  const { r } = moveTailInRow(rDiff, tail);
  const { c } = moveTailInCol(cDiff, tail);

  return { r, c };
};

const uniqueTailVisits = (knots) =>
  instructions.reduce(
    (state, { dir, steps }) =>
      numberRange(steps).reduce(({ head: { r, c }, tails: prevTails, visits: prevVisits }) => {
        const head = moveHead({ r, c }, dir, steps);

        const tails = prevTails.map(({ r: tR, c: tC }, i, others) => {
          const prev = i === 0 ? head : others[i - 1];
          const rDiff = Math.abs(prev.r - tR);
          const cDiff = Math.abs(prev.c - tC);
          const isClose = rDiff > 1 || cDiff > 1;
          const curr = { r: tR, c: tC };
          return isClose ? moveKnot(prev, curr) : curr;
        });

        return { head, tails, visits: [...prevVisits, tails.at(-1)] };
      }, state),
    { head: initialState, tails: numberRange(knots).map(() => initialState), visits: [] }
  );

const getUnique = ({ visits }: { visits: Position[] }) => new Set(visits.map(({ r, c }) => `${r},${c}`));

const part1 = getUnique(uniqueTailVisits(1)).size;
const part2 = getUnique(uniqueTailVisits(9)).size;

console.group(`2022-day08 ${fileName}`);
console.log("part 1", part1);
console.log("part 2", part2);
console.groupEnd();
