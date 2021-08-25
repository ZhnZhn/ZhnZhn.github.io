import crConfigType1 from '../../charts/crConfigType1'

import fnUtil from './fnUtil'
import fnAdapter from './fnAdapter'

const { toUTC, compose } = fnUtil
, {
  crDsValuesTimes,
  crConfOption
} = fnAdapter;

const _isArr = Array.isArray;

const _filterLeadingNulls = data => {
  const _len = data.length;
  let i = 0;
  for(i; i<_len; i++){
    if (data[i][1] !== null) break;
  }
  let j = _len - 1;
  for(j; j>-1; j--){
    if (data[j][1] !== null) break;
  }
  return data.slice(i, j+1);
};

const _isReverse = data => data.length > 2
  && data[0][0] > data[1][0];
const _checkOrder = data => _isReverse(data)
  ? data.reverse()
  : data;

const _fCrDataPoint = (values) => (time, i) => {
  const _pIndex = time.length - 1
  , isP = time[_pIndex] === '*'
  , _time = isP ? time.slice(0, _pIndex) : time
  , x = toUTC(_time)
  , y = values[i] ? values[i].value : null;
  return isP ? [x, y, 'p'] : [x, y];
};

const _postProcessData = compose(
  _filterLeadingNulls,
  _checkOrder
);

const _toData = (values, times) => {
  const _values = _isArr(values) ? values : [values]
  , _crPoint = _fCrDataPoint(_values);
  return _isArr(times)
    ? _postProcessData(times.map(_crPoint))
    : [];
};

const toArea = {
  crConfig: (json, option) => {
    const [ ds, values, times ] = crDsValuesTimes(json, option)
    , data = _toData(values, times)
    , confOption = crConfOption(ds, option);

    return crConfigType1({
      option, data, confOption
    });
  }
};

export default toArea
