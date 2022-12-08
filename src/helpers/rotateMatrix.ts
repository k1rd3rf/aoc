const rotateMatrix = <T>(m: T[][]) => m[0].map((val, index) => m.map((row) => row[index]).reverse());

export default rotateMatrix;
