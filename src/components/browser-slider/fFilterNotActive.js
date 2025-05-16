import {
  isNumber,
  parseIntBy10
} from '../../utils/isTypeFn';

let _currentYear;
const _getCurrentYear = () => _currentYear
  || (_currentYear = (new Date()).getUTCFullYear());

const _filterNotActive = item => {
  const _yUpdated = parseIntBy10((''+item.updated)
    .trim()
    .slice(0, 4)
  );
  return isNumber(_yUpdated)
    ? _getCurrentYear() - _yUpdated < 3
    : !0;
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
