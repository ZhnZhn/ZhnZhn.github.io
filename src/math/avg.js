//export function avg(series: Array<number>) {
export const avg = (
  series
) => {
  let sum = 0, len = series.length;
  for (let i = 0; i < len; i++) {
    sum += series[i];
  }
  return sum / len;
}
