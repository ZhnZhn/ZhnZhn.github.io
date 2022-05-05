const _isArr = Array.isArray
, _isNumber = n => typeof n === 'number'
    && n - n === 0;

export const getPointDate = point =>_isArr(point)
  ? point[0]
  : (point || {}).x;

export const getPointValue = point => _isArr(point)
  ? _isNumber(point[1])
       ? point[1]
       : '0.0'
  : point && _isNumber(point.y)
      ? point.y
      : '0.0';
