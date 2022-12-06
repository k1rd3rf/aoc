import { readFileSync } from "fs";
import { resolve } from "path";

const fileName = process.env.INPUT_FILE || "inputs.txt";
export default (pwd) => ({ input: readFileSync(resolve(pwd, fileName), "utf8"), fileName });
