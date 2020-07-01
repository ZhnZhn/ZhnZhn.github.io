
export default function safeFn(obj, propName, dfValue) {
  if (!obj) {
    return () => { return dfValue; };
  }

  return typeof obj[propName] == 'function'
    ? obj[propName]
    : () => { return dfValue; }
}
