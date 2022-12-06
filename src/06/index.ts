import { readFileSync } from "fs";
import { resolve } from "path";

const getAbsolutePath = (relativePath) => resolve(__dirname, relativePath);

const inputs = readFileSync(getAbsolutePath("inputs.txt"), "utf8");

const findSequence =
  (seqSize = 4) =>
  (b: string) =>
    b.split("").reduce(
      (prev, c, i) => {
        if (prev.i) return prev;
        if (new Set(prev.seq.split("").slice(i - seqSize, i)).size === seqSize) return { i };
        return { seq: prev.seq + c };
      },
      { seq: "", i: 0 }
    ).i;

const lines = inputs.split(/\n/);

const part1 = lines.map(findSequence(4));
console.log("part 1", part1);

const part2 = lines.map(findSequence(14));
console.log("part 2", part2);
