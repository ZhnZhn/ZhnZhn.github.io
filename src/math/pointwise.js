
//export function pointwise(operation: (...args: any[]) => any, ...serieses: Array<Array<number>>) {
export const pointwise = (
  operation,
  ...serieses
) => {
  let result = [];
  for (let i = 0, len = serieses[0].length; i < len; i++) {
    let iseries = (i) => serieses.map(x => x[i]);
    result.push(operation(...iseries(i)));
  }
  return result;
}
