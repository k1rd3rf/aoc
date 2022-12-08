import getInputs from "../helpers/getInputs";
import rotateMatrix from "../helpers/rotateMatrix";

const { input, fileName } = getInputs(__dirname);

type TreeSurroundings = {
  neighbours: number[][];
  treeHeight: number;
  r: number;
  c: number;
};

const grid = input.split(/\n/).map((r) => r.split("").map(Number));
const rotatedGrid = rotateMatrix(grid);

const surroundings: TreeSurroundings[] = grid.flatMap((row: number[], r) =>
  row.map((treeHeight, c) => {
    const up = rotatedGrid[c].slice(row.length - r);
    const right = row.slice(c + 1);
    const down = rotatedGrid[c].slice(0, row.length - r - 1);
    const left = row.slice(0, c);
    return { neighbours: [up, right, down, left], treeHeight, r, c };
  })
);

const isCoveredInAllDirections = ({ neighbours, treeHeight }: TreeSurroundings): boolean =>
  neighbours.filter((nH) => Math.max(...nH) >= treeHeight).length === 4;

const coveredTrees = surroundings.filter(isCoveredInAllDirections);

const part1 = surroundings.length - coveredTrees.length;
const part2 = "";

console.group(`2022-day08 ${fileName}`);
console.log("part 1", part1);
console.log("part 2", part2);
console.groupEnd();
