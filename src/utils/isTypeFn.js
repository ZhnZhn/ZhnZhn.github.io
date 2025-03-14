
const _fIsTypeof = strType => v => typeof v === strType;

export const isTypeNumber = _fIsTypeof("number")
export const isNumber = v => isTypeNumber(v) && v-v === 0
export const isPositiveNumber = v => isNumber(v) && v > 0
export const isNaN = Number.isNaN
export const isInt = Number.isInteger

export const isBool = _fIsTypeof("boolean")
export const isStr = _fIsTypeof("string")
export const isUndef = _fIsTypeof("undefined")
export const isFn = _fIsTypeof("function")

export const isStrOrNumber = v => v !== ""
  && (isStr(v) || isNumber(v))

export const isObj = v => typeof v === "object"
  && v !== null

export const isArr = Array.isArray
export const isNotEmptyArr = arr => isArr(arr)
  && arr.length > 0;
