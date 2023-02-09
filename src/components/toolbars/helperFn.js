
const _isArray = Array.isArray
, _getSeriaData = (
  config
) => (((config || {}).series || [])[0] || {}).data;

export const crInitialPeriod = (
  config,
  MONTH,
  YEAR,
  yearLength = 150
) => {
  const _d = _getSeriaData(config);
  return !_isArray(_d)
    ? '0'
    : _d.length > yearLength
         ? YEAR
         : MONTH;
}
