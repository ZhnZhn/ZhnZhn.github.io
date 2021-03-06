
const _isArr = Array.isArray
, _isNumber = n => typeof n === "number"
  && (n-n === 0)
, _isUndef = v => typeof v === "undefined"
, _isObj = obj => typeof obj === "object"
  && obj !== null;

const seriaHelperFn = {
  isNotEmptyArr: arr => {
    if (!_isArr(arr)) { return false; }
    for (let i=0; i<arr.length; i++){
      if (_isObj(arr[i])) { return true; }
    }
    return false;
  },
  isNumber: _isNumber,
  crPointGetter: data => {
    const getX = _isUndef(data[0].x)
      ? p => p[0]
      : p => p.x
    , getY = _isUndef(data[0].y)
       ? p => p[1]
       : p => p.y;
    return { getX, getY };
  },

  fGetY: (point) => {
    if (!point) { return; }
    if (_isArr(point)) {
      return p => p[1];
    }
    if (_isNumber(point.y)) {
      return p => p.y;
    }
    return;
  },

  getZeroCountFromStart: (arr, getY) => {
    let _toIndex = -1, i=0;
    for(; i<arr.length; i++){
      const _y = getY(arr[i])
      if (_y === 0 || _y === null){
        _toIndex = i
      } else {
        break;
      }
    }
    return _toIndex + 1;
  },

  getZeroIndexFromEnd: (arr, getY) => {
    let _zeroIndex = 0;
    for(let i=arr.length-1; i>-1; i--){
      const _y = getY(arr[i])
      if (_y === 0 || _y === null){
        _zeroIndex = i
      } else {
        break;
      }
    }
    return _zeroIndex;
  }
};

export default seriaHelperFn
