import getInputs from "../helpers/getInputs";

const { input, fileName } = getInputs(__dirname);

// eslint-disable-next-line no-shadow
enum CMD {
  CD = "$ cd ",
  LS = "$ ls",
}
type Folder = { [path: string]: Folder | number } | number;
type FS = { cwd: string[]; fs: Folder; prevCmd?: CMD };
type DirSizes = { [p: string]: number };
type DirSize = { size: number; pwd: string[] };

const goToDir = (cwd: string[], cmd: string): string[] => {
  const path = cmd.replaceAll(CMD.CD, "");
  if (path === "..") {
    return cwd.slice(0, cwd.length - 1);
  }
  return [...cwd, path];
};

const modifyObject = (fs: Folder, cwd: string[], value: Folder | number): Folder => {
  const [pwd, ...restCwd] = cwd;
  return {
    ...(fs as object),
    [pwd]: restCwd.length > 0 ? modifyObject(fs[pwd], restCwd, value) : value,
  };
};

const createDir = (fs: Folder, cwd: string[], dirName: string): Folder => modifyObject(fs, [...cwd, dirName], {});

const addFile = (fs: Folder, cwd: string[], size: string, name: string): Folder =>
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
    { cwd: [], fs: { "/": {} }, prevCmd: undefined } as FS
  );

const dirSizes = (folder: Folder, cwd: string[]): DirSize[] =>
  Object.entries(folder).flatMap(([path, value]) => {
    const size = parseInt(value, 10);
    const pwd = [...cwd, path];
    return Number.isNaN(size) ? dirSizes(value, pwd) : { size, pwd };
  });

const potentialDirTotalSize = (sizes: DirSizes, maxSize: number) =>
  Object.values(sizes).reduce((a, k) => a + (k > maxSize ? 0 : k), 0);

const sumDirectories = (sizes: DirSize[]): DirSizes =>
  sizes.reduce(
    (state, { size, pwd }) =>
      pwd.reduce((p, f, i) => {
        const key = ["/", ...pwd.slice(0, i)].join("/").replace("//", "/");
        const prevSize = p[key] || 0;

        return { ...p, [key]: prevSize + size };
      }, state as DirSize),
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
