import getInputs from "../../helpers/getInputs";

const { input, fileName } = getInputs(__dirname);

type Cube = { red: number; blue: number; green: number };

const getRevealed = () =>
  input
    .split(/\n/)
    .map((l) => l.match(/Game (\d+): (.*)/))
    .map(([, game, cubes]) => ({
      game: parseInt(game, 10),
      cubes: cubes
        .split(";")
        .map((s) =>
          s
            .trim()
            .split(",")
            .map((c) => {
              const [count, color] = c.trim().split(" ");
              return { count: parseInt(count, 10), color };
            })
            .reduce((a, { color, count }) => ({ ...a, [color]: count }), {}),
        )
        .reduce(
          (a, b) =>
            Object.keys(a)
              .map((color) => ({ [color]: Math.max(a[color], b[color] || 0) }))
              .reduce((x, y) => ({ ...x, ...y })),
          { red: 0, green: 0, blue: 0 },
        ),
    }));

const getData = (requiredCount: Cube) =>
  getRevealed()
    .filter(
      ({ cubes }) => Object.keys(requiredCount).filter((color) => cubes[color] <= requiredCount[color]).length > 2,
    )
    .reduce((total, { game }) => total + game, 0);

console.group(`2023-day02 ${fileName}`);
console.log("part 1", getData({ red: 12, green: 13, blue: 14 }));
// console.log("part 2", JSON.stringify(getData(), null, 2));
console.groupEnd();
