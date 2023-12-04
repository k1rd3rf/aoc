import getInputs from "../../helpers/getInputs";
import rotateMatrix from "../../helpers/rotateMatrix";

const { input, fileName } = getInputs(__dirname);

const getData = () => input.split(/\n/).map((s) => s.split(""));

const grid = getData();
const rotatedGrid = rotateMatrix(grid);

type Neighbours = {
  nw?: string;
  n?: string;
  ne?: string;
  e?: string;
  se?: string;
  s?: string;
  sw?: string;
  w?: string;
};

type Column = {
  c: number;
  r: number;
  neighbours: Neighbours;
  value: string;
};

type ValueWithNeighbour = [string, Neighbours];

const hasValue = (v) => !!v && v !== ".";

const surroundings = grid
  .map((row: string[], r) =>
    row.map((value, c): Column => {
      const nw = (rotatedGrid[c - 1] || "").slice(row.length - r)[0];
      const n = rotatedGrid[c].slice(row.length - r)[0];
      const ne = (rotatedGrid[c + 1] || "").slice(row.length - r)[0];
      const e = row.slice(c + 1)[0];
      const se = (rotatedGrid[c + 1] || "").slice(0, row.length - r - 1).at(-1);
      const s = rotatedGrid[c].slice(0, row.length - r - 1).reverse()[0];
      const sw = (rotatedGrid[c - 1] || "").slice(0, row.length - r - 1).at(-1);
      const w = row.slice(0, c).reverse()[0];
      const neighbours = Object.fromEntries(
        Object.entries({ nw, n, ne, e, se, s, sw, w }).filter(([, v]) => hasValue(v)),
      );
      return { value, r, c, neighbours };
    }),
  )
  .map((columns) =>
    columns
      .reduce((pairs, column) => [...pairs, [column.value, column.neighbours]], [] as ValueWithNeighbour[])
      .map((row2) => (!Number.isNaN(parseInt(row2[0] as string, 10)) ? row2 : "sep"))
      .reduce(
        (a, b) => {
          if (b === "sep") {
            return { ...a, c: a.c + 1 };
          }

          return {
            ...a,
            groups: {
              ...a.groups,
              [a.c]: [...(a.groups[a.c] || []), b],
            },
          };
        },
        { c: 0, groups: {} as { [p: string]: ValueWithNeighbour[] } },
      ),
  )
  .flatMap((x) =>
    Object.values(x.groups).flatMap((a) => {
      const ns = a.reduce(
        (hasNeighbour, g) =>
          hasNeighbour || Object.values(g[1]).filter((n: string) => Number.isNaN(parseInt(n, 10))).length > 0,
        false,
      );
      return ns
        ? a
            .map(([k]) => (Number.isNaN(parseInt(k, 10)) ? " " : parseInt(k, 10)))
            .join("")
            .split(" ")
        : [];
    }),
  )
  .filter((n) => !Number.isNaN(parseInt(n, 10)))
  .map((a) => parseInt(a, 10))
  .reduce((a, b) => a + b, 0);

console.group(`2023-day03 ${fileName}`);
console.log("part 1", surroundings);
console.groupEnd();
