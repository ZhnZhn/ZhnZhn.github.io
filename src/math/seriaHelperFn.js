
const _isArr = Array.isArray;
const _isNumber = n => typeof n === 'number'
  && (n - n === 0);

const seriaHelperFn = {
  isPointArr: data => _isArr(data)
    && data.length > 1
    && _isArr(data[0]),

  fGetY: (point) => {
    if (!point) { return; }
    else if (_isArr(point)) {
      return p => p[1];
    } else if (point && _isNumber(point.y)) {
      return p => p.y;
    }
    return;
  },

  getZeroCountFromStart: (arr, getY) => {
    let _toIndex = -1;
    for(let i=0; i<arr.length; i++){
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
