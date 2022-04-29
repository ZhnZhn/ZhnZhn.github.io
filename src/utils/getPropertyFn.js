export const getC = item => {
  const { caption, c } = item ?? {};
  return '' + (caption ?? c ?? '');
};

export const getV = (
  item,
  { isUpper, dfValue='' }={}
) => {
  const { value, v } = item ?? {}
  , _v = value ?? v
  , _value = typeof _v === 'number'
       ? ''+_v
       : _v ?? ''+dfValue;
  return isUpper
    ? _value.toUpperCase()
    : _value;
}
