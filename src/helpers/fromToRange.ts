import numberRange from "./numberRange";

const range = ({ from, to }: { from: number; to: number }) => numberRange(to - from + 1, from);
export default range;
