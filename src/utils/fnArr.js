import isInArrStr from './isInArrStr';

const _isArr = Array.isArray
, _fIsItem = (propName, propValue) =>
    item => item[propName] === propValue
, _findArrIndexBy = (arr, propName, propValue) =>
    arr.findIndex(_fIsItem(propName, propValue));

const fnArr = {
  isInArrStr,

  findIndexByProp: (propName) => (arr, propValue) => _isArr(arr)
    ? _findArrIndexBy(arr, propName, propValue)
    : -1,

  isSameByProp: (propName) => (arr, propValue) => _isArr(arr)
    ? _findArrIndexBy(arr, propName, propValue) === -1
        ? false : true
    : false
};

export default fnArr
