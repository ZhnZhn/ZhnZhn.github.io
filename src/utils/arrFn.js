import { bindTo } from "./bindTo";

const _isArr = Array.isArray
, _fIsItem = (
  propName,
  propValue
) => item => item[propName] === propValue
, _findArrIndexBy = (
  arr,
  propName,
  propValue
) => arr.findIndex(_fIsItem(propName, propValue));

export const isInArrStr = (
  arr
) => (str) => _isArr(arr)
  ? arr.indexOf(str) !== -1
  : false;

export const arrFactoryIsSameByProp = (
  propName
) => (arr, propValue) => _isArr(arr)
  ? _findArrIndexBy(arr, propName, propValue) !== -1
  : false

export const arrFactoryFindIndexByProp = (
  propName
) => (arr, propValue) => _isArr(arr)
  ? _findArrIndexBy(arr, propName, propValue)
  : -1

export const joinBy = (
  delimeter,
  ...restItems
) => restItems
  .filter(Boolean)
  .join(delimeter)

export const joinByDot = bindTo(joinBy, ".")
