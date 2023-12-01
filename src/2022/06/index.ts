import getInputs from "../../helpers/getInputs";

const { input, fileName } = getInputs(__dirname);

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

const lines = input.split(/\n/);
const part1 = lines.map(findSequence(4));
const part2 = lines.map(findSequence(14));

console.group(`2022-day06 ${fileName}`);
console.log("part 1", part1);
console.log("part 2", part2);
console.groupEnd();
