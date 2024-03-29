import getInputs from "../../helpers/getInputs";

const { input, fileName } = getInputs(__dirname);

const getData = () => input.split(/\n\n/);

const [first, ...rows] = getData();

const [, seed] = first.split(/:/);
const seeds = seed
  .trim()
  .split(/\s/)
  .map((s) => parseInt(s, 10));

const rowMaps = rows.map((r) => {
  const [, src, dst, , maps] = r.split(/(.*)-to-(.*) map:(.*)/);
  const ranges = maps
    .split(/\n/)
    .filter((s) => !!s)
    .map((s2) => {
      const [d, s, l] = s2.split(/\s/).map((n) => parseInt(n, 10));
      const dR = { from: d, to: d + l };
      const sR = { from: s, to: s + l };
      return { src, dst, d, dR, s, sR, l };
    });

  return {
    src,
    dst,
    maps: ranges.reduce((a, { sR, dR, l }) => ({ ...a, l, src, dst, sR: [...a.sR, sR], dR: [...a.dR, dR] }), {
      sR: [],
      dR: [],
    }),
  };
});

console.group(`2023-day05 ${fileName}`);

const getSeedRoutes = (seedList: number[]): number[] =>
  seedList.map(
    (u) =>
      rowMaps.reduce((find, { maps }) => {
        const index = maps.sR.findIndex(({ from, to }) => find > from && find < to);

        if (index >= 0) {
          const sR = maps.sR[index];
          const dR = maps.dR[index];
          return dR.from + Math.abs(find - sR.from);
        }

        return find;
      }, u),
    -1,
  );

const sortList = (locations: number[]) => locations.sort((a, b) => a - b);

const part1 = sortList(getSeedRoutes(seeds))[0];
console.log("part 1", part1);

/*
const getSeedRanges = (seedList: number[]) =>
  seedList.reduce(
    (a, b) => {
      if (a.prev) return { seedRanges: [...a.seedRanges, [a.prev, b]], prev: undefined };
      return { seedRanges: a.seedRanges, prev: b };
    },
    { seedRanges: [] as number[][], prev: undefined as number | undefined },
  ).seedRanges;

const seedRanges = getSeedRanges(seeds);
console.log({ seedRanges });

const a = seedRanges.reduce((low, [from, to]) => {
  console.group({ from, to }, low);

  let newLow = low;
  for (let i = from; i < from + to; ) {
    const [s] = getSeedRoutes([from]);
    if (s <= newLow) {
      newLow = s;
      console.log({ i, newLow });
    }
    i += 1;
  }
  console.groupEnd();

  return newLow;
}, 23738617);

console.log("part 2", a);
console.groupEnd();
 */
