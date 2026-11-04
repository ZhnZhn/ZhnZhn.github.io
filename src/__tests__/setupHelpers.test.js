//import { rs } from '@rstest/core';

//export const crTestFn = (fn) => rs.fn(fn)
export const crTestFn = fn => jest.fn(fn)

//export const testSpyOn = (...args) => rs.spyOn(...args)
export const testSpyOn = (...args) => jest.spyOn(...args)
