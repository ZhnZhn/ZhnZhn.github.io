const _isNumber = n => typeof n === 'number'
 && n - n === 0;

let _currentYear;
const _getCurrentYear = () => _currentYear
  || (_currentYear = (new Date()).getUTCFullYear());

const _filterNotActive = item => {
  const _yUpdated = parseInt((''+item.updated)
    .trim()
    .slice(0, 4),
  10);
  return _isNumber(_yUpdated)
    ? _getCurrentYear() - _yUpdated < 3
    : true;
};

const _filterSdn = item => item.active;

const fFilterNotActive = (
  is,
  lT
) => is ? lT === 'SDN'
  ? _filterSdn
  : _filterNotActive
: void 0;

export default fFilterNotActive
