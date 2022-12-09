const numberRange = (size, startAt = 0): number[] => [...Array(size).keys()].map((i) => i + startAt);

export default numberRange;
