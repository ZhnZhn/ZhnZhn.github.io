const _isArr = Array.isArray;

const _findDataIndex = (data, v) => {
  const _max = data.length;
  let i = 0;
  for (i; i<_max; i++) {
    if (data[i][0] >= v) {
      return i;
    }
  }
  return i;
};

const crDataMinMaxSlice = ({
  data,
  userMin,
  userMax
}) => {
  if (!_isArr(data) || !_isArr(data[0])
        || !userMin || !userMax) {
    return data;
  }
  const _fromIndex = _findDataIndex(data, userMin)
  , _toIndex = _findDataIndex(data, userMax);
  return _fromIndex <= _toIndex
    ? data.slice(_fromIndex, _toIndex+1)
    : data;
};

export default crDataMinMaxSlice
