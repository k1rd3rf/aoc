import { readFileSync } from "fs";
import { resolve } from "path";

const getAbsolutePath = (relativePath) => resolve(__dirname, relativePath);

const inputs = readFileSync(getAbsolutePath("inputs.txt"), "utf8");

const data = inputs
  .split(/\n/)
  .map((sack) => {
    const comp1 = sack.slice(0, sack.length / 2);
    const comp2 = sack.replaceAll(comp1, "");
    const i = [...comp1].filter((c) => comp2.includes(c));
    const u = i[0] as string;
    const ascii = u.charCodeAt(0);
    return [ascii - "a".charCodeAt(0) + 1, ascii - "A".charCodeAt(0) + 27].filter((n) => n > 0)[0];
  })
  .reduce((a, b) => a + b);

console.log("part 1", data);
