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
    if (data[i].y !== null) break;
  }
  return data.slice(i);
};

const _isReverse = data => data.length > 2
  && data[0].x > data[1].x;
const _checkOrder = data => _isReverse(data)
  ? data.reverse()
  : data;

const _fCrDataPoint = (values) => (time, i) => ({
  x: toUTC(time),
  y: values[i] ? values[i].value : null
});

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
    const { ds, values, times } = crDsValuesTimes(json, option)
    , data = _toData(values, times)
    , confOption = crConfOption(ds, option);

    return crConfigType1({
      option, data, confOption
    });
  }
};

export default toArea
