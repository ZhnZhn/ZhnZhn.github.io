//const safeGet = require('../safeGet').default
import safeGet from '../safeGet'

test('should get prop name', () => {
  const obj = { a : 1 }
  expect(safeGet(obj, 'a')).toBe(obj.a)
} )

test('should get undefined from string for propName', () => {
  expect(safeGet('str', 'a')).toBe(undefined)
})

test('should get undefined from falsy', () => {
  expect(safeGet(null, 'a')).toBe(undefined)
  expect(safeGet(undefined, 'a')).toBe(undefined)
  expect(safeGet('', 'a')).toBe(undefined)
  expect(safeGet(false, 'a')).toBe(undefined)
  expect(safeGet(0, 'a')).toBe(undefined)
  expect(safeGet(NaN, 'a')).toBe(undefined)
})

test('should get default from falsy with default', () => {
  const df = { a: 1 }
  expect(safeGet(null, 'a', df)).toBe(df)
  expect(safeGet(undefined, 'a', df)).toBe(df)
  expect(safeGet('', 'a', df)).toBe(df)
  expect(safeGet(false, 'a', df)).toBe(df)
  expect(safeGet(0, 'a', df)).toBe(df)
  expect(safeGet(NaN, 'a', df)).toBe(df)
})

test('should get obj form array by index', () => {
  const arr = ['a', 'b', 'c']
  expect(safeGet(arr, '[0]')).toBe(arr[0])
  expect(safeGet(arr, '[1]')).toBe(arr[1])
  expect(safeGet(arr, '[3]')).toBe(undefined)
})
