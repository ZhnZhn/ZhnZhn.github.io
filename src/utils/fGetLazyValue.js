
const _fGetLazyValue = (
  crValue
) => {
  let value;
  return () => value === void 0
    ? (value = crValue())
    : value;
}

const _fGetLazyPromisifyValue = crPromiseValue => {
  let value;
  return () => value === void 0
    ? crPromiseValue().then(v => (value = v))
    : Promise.resolve(value)
}

export const fGetLazyValue = (
  crValue,
  isPromisify
) => isPromisify
  ? _fGetLazyPromisifyValue(crValue)
  : _fGetLazyValue(crValue)
