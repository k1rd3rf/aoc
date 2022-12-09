import numberRange from "./numberRange";

const range = ({ from, to }: { from: number; to: number }) => numberRange(Math.abs(to - from) + 1, from);
export default range;
