
export const isTypeNumber = v => typeof v === 'number'
export const isNumber = v => isTypeNumber(v) && v-v === 0
export const isNaN = Number.isNaN
export const isInt = Number.isInteger

export const isStr = v => typeof v === 'string'
export const isUndef = v => typeof v === 'undefined'
export const isFn = v => typeof v === 'function'

export const isObj = v => typeof v === 'object' && !!v

const _isArr = Array.isArray
export const isNotEmptyArr = arr => _isArr(arr)
  && arr.length > 0;
