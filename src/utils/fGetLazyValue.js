
export const fGetLazyValue = (
  crValue
) => {
  let value;
  return () => value === void 0
    ? (value = crValue())
    : value;
}

export const fGetLazyValueAsync = crPromiseValue => {
  let value;
  return (isGetValueSync) => value === void 0
    ? crPromiseValue()
        .catch(err => console.log(err))
        .then(v => (value = v))
    : isGetValueSync
    ? value
    : Promise.resolve(value);
}
