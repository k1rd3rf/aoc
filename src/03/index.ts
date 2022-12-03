import { readFileSync } from "fs";
import { resolve } from "path";

const getAbsolutePath = (relativePath) => resolve(__dirname, relativePath);

const inputs = readFileSync(getAbsolutePath("inputs.txt"), "utf8");

const sacks = inputs.split(/\n/);

const characterRank = (u: string) => {
  const ascii = u.charCodeAt(0);
  return [ascii - "a".charCodeAt(0) + 1, ascii - "A".charCodeAt(0) + 27].filter((n) => n > 0)[0];
};

const data = sacks
  .map((sack) => {
    const comp1 = sack.slice(0, sack.length / 2);
    const comp2 = sack.replaceAll(comp1, "");
    const i = [...comp1].filter((c) => comp2.includes(c));
    return characterRank(i[0] as string);
  })
  .reduce((a, b) => a + b);

const data2 = Array.from(Array(sacks.length / 3).keys())
  .map((g) => [sacks[g * 3 + 0], sacks[g * 3 + 1], sacks[g * 3 + 2]])
  .map(
    ([a, b, c]) =>
      a
        .split("")
        .filter((item) => b.includes(item) && c.includes(item))
        .sort((x, y) => x.length - y.length)[0][0]
  )
  .map(characterRank)
  .reduce((a, b) => a + b);

console.log("part 1", data);
console.log("part 2", data2);
