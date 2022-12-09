import getInputs from "../helpers/getInputs";
import numberRange from "../helpers/numberRange";

const { input, fileName } = getInputs(__dirname);

type Direction = "U" | "D" | "R" | "L";
type Instruction = { dir: Direction; steps: number };

const instructions: Instruction[] = input.split(/\n/).map((r) => {
  const [dir, steps] = r.split(" ");
  return { dir: dir as Direction, steps: Number(steps) };
});

type Position = { r: number; c: number };
const initialState: Position = { r: 0, c: 0 };

const moveHead = ({ r, c }: Position, dir: Direction, steps: number): Position => {
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

const { visits } = instructions.reduce(
  (state, { dir, steps }) =>
    numberRange(steps).reduce(({ head: { r, c }, tail: { r: tR, c: tC }, visits: prevVisits }) => {
      const head = moveHead({ r, c }, dir, steps);

      const rDiff = Math.abs(head.r - tR);
      const cDiff = Math.abs(head.c - tC);
      const isClose = rDiff > 1 || cDiff > 1;

      const tail = isClose ? { r, c } : { r: tR, c: tC };

      return { head, tail, visits: [...prevVisits, tail] };
    }, state),
  { head: initialState, tail: initialState, visits: [] }
);
const uniqueVisits = new Set(visits.map(({ r, c }) => `${r},${c}`));

const part1 = uniqueVisits.size;
const part2 = "";

console.group(`2022-day08 ${fileName}`);
console.log("part 1", part1);
console.log("part 2", part2);
console.groupEnd();
