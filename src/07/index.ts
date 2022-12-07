import getInputs from "../helpers/getInputs";

const { input, fileName } = getInputs(__dirname);

// eslint-disable-next-line no-shadow
enum CMD {
  CD = "$ cd ",
  LS = "$ ls",
}
type FS = { cwd: string[]; fs: object; prevCmd?: CMD };
type DirSizes = { [p: string]: number };

const goToDir = (cwd: string[], cmd: string): string[] => {
  const path = cmd.replaceAll(CMD.CD, "");
  if (path === "..") {
    return cwd.slice(0, cwd.length - 1);
  }
  return [...cwd, path];
};

const modifyObject = (fs: object, cwd: string[], value: object | number): object => {
  const [pwd, ...restCwd] = cwd;
  return {
    ...fs,
    [pwd]: restCwd.length > 0 ? modifyObject(fs[pwd], restCwd, value) : value,
  };
};

const createDir = (fs: object, cwd: string[], dirName: string): object => modifyObject(fs, [...cwd, dirName], {});

const addFile = (fs: object, cwd: string[], size: string, name: string) =>
  modifyObject(fs, [...cwd, name], Number(size));

const getFileStructure = (inputs: string[]): FS =>
  inputs.reduce(
    (state, cmd) => {
      const { cwd, prevCmd, fs } = state;
      if (cmd.startsWith(CMD.CD)) {
        return { ...state, cwd: goToDir(cwd, cmd), prevCmd: CMD.CD };
      }
      if (cmd.startsWith(CMD.LS)) {
        return { ...state, prevCmd: CMD.LS };
      }
      if (prevCmd === CMD.LS) {
        const [a, b] = cmd.split(" ");
        if (a === "dir") {
          return { ...state, fs: createDir(fs, cwd, b) };
        }
        return { ...state, fs: addFile(fs, cwd, a, b) };
      }
      return { ...state };
    },
    { cwd: [], fs: { "/": {} }, prevCmd: undefined }
  );

const dirSizes = (fs: object, cwd: string[]): { size: number; pwd: string[] }[] =>
  Object.keys(fs).flatMap((p) => {
    const size = parseInt(fs[p], 10);
    const pwd = [...cwd, p];
    if (Number.isNaN(size)) {
      return dirSizes(fs[p], pwd);
    }
    return { size, pwd };
  });

const potentialDirTotalSize = (sizes: DirSizes, maxSize: number) =>
  Object.values(sizes).reduce((a, k) => a + (k > maxSize ? 0 : k), 0);

const sumDirectories = (sizes: { size: number; pwd: string[] }[]): DirSizes =>
  sizes.reduce(
    (state, { size, pwd }) =>
      pwd.reduce((p, f, i) => {
        const key = ["/", ...pwd.slice(0, i)].join("/").replace("//", "/");
        const prevSize = p[key] || 0;

        return { ...p, [key]: prevSize + size };
      }, state),
    {}
  );

const traverseFs = getFileStructure(input.split(/\n/));
const sizeOfDirs = dirSizes(traverseFs.fs["/"], []);
const sumOfDirs = sumDirectories(sizeOfDirs);

const part1 = potentialDirTotalSize(sumOfDirs, 100000);

const usedSpace = sumOfDirs["/"];
const freeSpace = 70000000 - usedSpace;
const needed = 30000000 - freeSpace;

const part2 = Math.min(...Object.values(sumOfDirs).filter((s) => s > needed));

console.group(`2022-day07 ${fileName}`);
console.log("part 1", part1);
console.log("part 2", part2);
console.groupEnd();
