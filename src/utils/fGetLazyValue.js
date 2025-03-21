
export const fGetLazyValue = (
  crValue,
  isPromisify
) => {
  let value;
  return () => value === void 0
    ? (value = crValue())
    : isPromisify
    ? Promise.resolve(value)
    : value;
}
