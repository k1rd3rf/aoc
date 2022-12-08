import getInputs from "../helpers/getInputs";
import rotateMatrix from "../helpers/rotateMatrix";

const { input, fileName } = getInputs(__dirname);

const grid = input.split(/\n/).map((r) => r.split("").map(Number));
const rotatedGrid = rotateMatrix(grid);

type Surroundings = {
  neighbours: number[][];
  treeHeight: number;
  r: number;
  c: number;
};

type SurroundingsWithVisible = Surroundings & {
  visible: boolean;
};

const surroundings: Surroundings[] = grid.flatMap((row: number[], r) =>
  row.map((treeHeight, c) => {
    const up = rotatedGrid[c].slice(row.length - r);
    const right = row.slice(c + 1);
    const down = rotatedGrid[c].slice(0, row.length - r - 1).reverse();
    const left = row.slice(0, c).reverse();
    return { neighbours: [up, left, right, down], treeHeight, r, c };
  })
);

const isVisible = ({ neighbours, treeHeight, ...surr }: Surroundings): SurroundingsWithVisible => ({
  ...surr,
  visible: neighbours.filter((nH) => Math.max(...nH) >= treeHeight).length === 4,
  neighbours,
  treeHeight,
});

const allTrees = surroundings.map(isVisible);

const part1 = allTrees.filter((i) => !i.visible).length;

const locationScores = allTrees.map(({ neighbours, treeHeight }) =>
  neighbours
    .map(
      (neighboursInDirection) =>
        neighboursInDirection.reduce(
          ({ done, score }, th) => {
            if (done) {
              return { done, score };
            }
            return { score: score + 1, done: th >= treeHeight };
          },
          {
            score: 0,
            done: false,
          }
        ).score
    )
    .reduce(Math.imul)
);
const part2 = Math.max(...locationScores);

console.group(`2022-day08 ${fileName}`);
console.log("part 1", part1);
console.log("part 2", part2);
console.groupEnd();
