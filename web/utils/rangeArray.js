export default function rangeArray(start, end) {
  const length = end - start;
  return Array.from({ length }, (_, i) => start + i);
}
