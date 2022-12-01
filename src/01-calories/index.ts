import { readFileSync } from "fs";
import { resolve } from "path";

export const getAbsolutePath = relativePath =>
    resolve(__dirname, relativePath);

const inputs = readFileSync(getAbsolutePath("inputs.txt"), "utf8");

const data = inputs.split(/\n\n/)
    .map(cal => cal.split(/\n/)
        .map(n => parseInt(n, 10)))
    .map(nums => nums.reduce((a, b) => a + b, 0))
    .sort()
    .reverse();

console.log(data[1]);
console.log(data[1]+data[2]+data[3]);
