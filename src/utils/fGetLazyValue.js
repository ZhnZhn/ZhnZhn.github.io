import { bindTo } from './bindTo'

const _fGetLazyValue = (
  crValue
) => {
  let value;
  return () => value === void 0
    ? (value = crValue())
    : value;
}

const _fGetLazyPromisifyValue = crValue => {
  let value;
  return bindTo((setValue) => value === void 0
    ? crValue(setValue)
    : Promise.resolve(value),
    _v => (value = _v)
  );
}

export const fGetLazyValue = (
  crValue,
  isPromisify
) => isPromisify
  ? _fGetLazyPromisifyValue(crValue)
  : _fGetLazyValue(crValue)
