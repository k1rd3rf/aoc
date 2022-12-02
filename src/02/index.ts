import { readFileSync } from "fs";
import { resolve } from "path";

const getAbsolutePath = (relativePath) => resolve(__dirname, relativePath);

const inputs = readFileSync(getAbsolutePath("inputs.txt"), "utf8");

const move = ["X", "Y", "Z"];

const choices = {
  A: ["Z", "X", "Y"],
  B: ["X", "Y", "Z"],
  C: ["Y", "Z", "X"],
};

const gameRank = (one: string, two: string) => {
  const choiceScore = move.indexOf(two) + 1;
  const outcomeScore = choices[one].indexOf(two) * 3;

  const res = choiceScore + outcomeScore;
  return { choiceScore, res, outcomeScore };
};

const gameRank2 = (one: string, two: string) => {
  const choiceIndex = move.indexOf(two);
  const { res } = gameRank(one, choices[one][choiceIndex]);
  return res;
};

const data = inputs
  .split(/\n/)
  .map((game) => {
    const [one, two] = game.split(" ");
    return gameRank(one, two);
  })
  .reduce((total, b) => total + b.res, 0);

const data2 = inputs
  .split(/\n/)
  .map((game) => {
    const [one, two] = game.split(" ");
    return gameRank2(one, two);
  })
  .reduce((total, b) => total + b, 0);

console.log("part 1", data);
console.log("part 2", data2);
