
export const isTypeNumber = n => typeof n === 'number'
export const isNumber = n => isTypeNumber(n) && n-n === 0
export const isNaN = Number.isNaN
export const isInt = Number.isInteger

export const isStr = str => typeof str === 'string'
export const isUndef = v => typeof v === 'undefined'

export const isObj = obj => typeof obj === 'object' && !!obj

const _isArr = Array.isArray
export const isNotEmptyArr = arr => _isArr(arr)
  && arr.length > 0;
