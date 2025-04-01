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

export const filterBoolean = items => items.filter(Boolean)

export const joinBy = (
  delimeter,
  ...restItems
) => restItems
  .filter(Boolean)
  .join(delimeter)

export const joinByBlank = bindTo(joinBy, " ")
export const joinByNbsp = bindTo(joinBy, "\u00A0")
export const joinByDot = bindTo(joinBy, ".")
export const joinByColon = bindTo(joinBy, ": ")
export const joinByComma = bindTo(joinBy, ", ")
export const joinByUndescore = bindTo(joinBy, "_")

export const safeLoopOfArray = (
  items,
  onItem
) => {
  if (_isArr(items)) {
    for (let item of items) {
      onItem(item)
    }
    return !0;
  }
}
