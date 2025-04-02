
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
  return (isGetValueSync) => value === void 0
    ? crPromiseValue()
        .catch(err => console.log(err))
        .then(v => (value = v))
    : isGetValueSync
    ? value
    : Promise.resolve(value);
}

export const fGetLazyValue = (
  crValue,
  isPromisify
) => isPromisify
  ? _fGetLazyPromisifyValue(crValue)
  : _fGetLazyValue(crValue)
