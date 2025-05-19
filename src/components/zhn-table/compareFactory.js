const _isNaN = Number.isNaN;

const _compareMaybeNaN = (
  v1,
  v2
) => _isNaN(v1)
  ? _isNaN(v2) ? 0 : 1
  : _isNaN(v2) ? -1 : 2;

const _compareValue = (
  v1,
  v2
) => v1 < v2
  ? 1
  : v1 > v2
  ? -1
  : 0;

const _compareNumber = (v1, v2) => {
  const _r = _compareMaybeNaN(v1, v2);
  return _r === 2
    ? _compareValue(v1, v2)
    : _r;
};

export const factoryCompareBy = (
  TOKEN_NAN,
  pn
) => (a, b) => {
  const v1 = a[pn], v2 = b[pn];
  return (typeof v1 === 'number' || v1 === TOKEN_NAN)
    ? _compareNumber(v1, v2)
    : _compareValue(v1, v2);
}

export const factoryOpCompareBy = (
  pn,
  fn
) => (a, b) => {
  const _r = _compareMaybeNaN(a[pn], b[pn]);
  return _r === 2
    ? fn(b, a)
    : _r;
}
