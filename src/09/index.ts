import getInputs from "../helpers/getInputs";
import numberRange from "../helpers/numberRange";

const { input, fileName } = getInputs(__dirname);

type Direction = "U" | "D" | "R" | "L";
type Instruction = { dir: Direction; steps: number };
type Grid = { h: boolean; t: boolean }[][];
type State = {
  head: number[];
  grid: Grid;
  tail: number[];
};

const instructions: Instruction[] = input.split(/\n/).map((r) => {
  const [dir, steps] = r.split(" ");
  return { dir: dir as Direction, steps: Number(steps) };
});

const printGrid = ({ grid, head, tail }: State) =>
  grid
    .map((row, r) =>
      row
        .map((col, c) => {
          const [hR, hC] = head;
          const [tR, tC] = tail;

          const currR = r + 1;
          const currC = c + 1;

          if (hR === currR && hC === currC) return "H";
          // if (tR === currR && tC === currC) return "T";

          return col.h ? "#" : ".";
        })
        .join("")
    )
    .reverse()
    .join("\n");

const adjustGrid = (grid: Grid, moveRow: number[], moveCol: number[]): Grid => {
  const [fromRow, toRow] = moveRow.sort();
  const [fromCol, toCol] = moveCol.sort();
  console.log({ fromRow, toRow, fromCol, toCol });

  return numberRange(Math.max(grid.length, toRow))
    .map((row) => grid[row] || [])
    .map((row, r) =>
      numberRange(Math.max(row.length, toCol))
        .map((col, c) => row[c] || { h: false, t: false })
        .map((col, c) => {
          const currR = r + 1;
          const currC = c + 1;
          const been =
            (fromRow <= currR && currR <= toRow && currC === fromCol) ||
            (fromCol <= currC && currC <= toCol && currR === fromRow);
          const h = col.h || been;
          return { ...col, h };
        })
    );
};

function moveUp(head: number[], tail: number[], grid: Grid, steps: number): State {
  const [headRow, headCol] = head;
  const [tailRow, tailCol] = tail;

  const toRow = headRow + steps;

  return {
    grid: adjustGrid(grid, [headRow, toRow], [headCol, headCol]),
    head: [toRow, headCol],
    tail,
  };
}

function moveDown(head: number[], tail: number[], grid: Grid, steps: number): State {
  const [headRow, headCol] = head;
  const [tailRow, tailCol] = tail;

  const toRow = headRow - steps;

  return {
    grid: adjustGrid(grid, [headRow, toRow], [headCol, headCol]),
    head: [toRow, headCol],
    tail,
  };
}

function moveRight(head: number[], tail: number[], grid: Grid, steps: number): State {
  const [headRow, headCol] = head;
  const [tailRow, tailCol] = tail;

  const toCol = headCol + steps;

  return {
    grid: adjustGrid(grid, [headRow, headRow], [headCol, toCol]),
    head: [headRow, toCol],
    tail,
  };
}

function moveLeft(head: number[], tail: number[], grid: Grid, steps: number): State {
  const [headRow, headCol] = head;
  const [tailRow, tailCol] = tail;

  const toCol = headCol - steps;

  return {
    grid: adjustGrid(grid, [headRow, headRow], [toCol, headCol]),
    head: [headRow, toCol],
    tail,
  };
}

const initialState: State = {
  grid: [[{ h: true, t: true }]],
  head: [1, 1],
  tail: [1, 1],
};

const moveHead = (dir: Direction, head: number[], tail: number[], grid: Grid, steps: number, state: State) => {
  switch (dir) {
    case "R":
      return moveRight(head, tail, grid, steps);
    case "U":
      return moveUp(head, tail, grid, steps);
    case "L":
      return moveLeft(head, tail, grid, steps);
    case "D":
      return moveDown(head, tail, grid, steps);
    default:
      throw Error(`Unknown instruction: ${JSON.stringify({ state, dir, steps })}`);
  }
};

const part1 = instructions.reduce((state, { dir, steps }) => {
  const { grid, head, tail } = state;
  console.group({ head, tail, dir, steps });
  const state1 = moveHead(dir, head, tail, grid, steps, state);
  console.log(printGrid(state1));
  console.groupEnd();
  return state1;
}, initialState);
const part2 = "";

console.group(`2022-day08 ${fileName}`);
const validHead = part1.head[0] === 3 && part1.head[1] === 3;
console.log("part 1", { tail: part1.tail, validHead });
console.log(printGrid(part1));
console.log("part 2", part2);
console.groupEnd();
