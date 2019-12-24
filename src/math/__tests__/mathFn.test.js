import Big from 'big.js'
import mathFn from '../mathFn'
import { Direction } from '../../constants/Type'

const {
  roundBy,
  calcPercent,
  crValueMoving,
  toFixed,
  toFixedNumber
} = mathFn;

const PERCENT_0 = '0.00%';
const PERCENT_100 = '100.00%';

const _fValueMoving = (nowValue, prevValue) => ({
  nowValue, prevValue, Direction
});

describe('roundBy', () => {
  const fn = roundBy
  test('should return rounded number from string or number by', ()=>{
    expect(fn(1.555, 2)).toBe(1.56)
    expect(fn('1.555', 2)).toBe(1.56)
    expect(fn(1.005, 2)).toBe(1.01)
    expect(fn('1.005', 2)).toBe(1.01)
    expect(fn(0)).toBe(0)

  })
})

describe('calcPercent', ()=>{
  const fn = calcPercent
  test('should return str percent with Fixed 2 from Big values', ()=>{
     const r = fn({ bValue: Big(10), bTotal: Big(100)})
     expect(r).toBe('10.00')
  })
})

describe('crValueMoving', () => {
   const fn = crValueMoving
   test('should return correct obj for Big values', ()=>{
     const r = fn(_fValueMoving(
        Big('200.02'), Big('100.01')
     ));

     expect(r.value).toBe('200.02')
     expect(r.percent).toBe(PERCENT_100)
     expect(r.delta).toBe('100.01')
     expect(r.direction).toBe(Direction.UP)
   })
   test('should return correct obj for strings values with radix', ()=>{
     const r = fn(_fValueMoving(
       '200.02', '100.01'
     ));

     expect(r.value).toBe('200.02')
     expect(r.percent).toBe(PERCENT_100)
     expect(r.delta).toBe('100.01')
     expect(r.direction).toBe(Direction.UP)
   })
   test('should return correct obj for strings values with nowValue="0"', ()=>{
     const r = fn(_fValueMoving(
       '0', '100'
     ));

     expect(r.value).toBe('0')
     expect(r.percent).toBe(PERCENT_100)
     expect(r.delta).toBe('100')
     expect(r.direction).toBe(Direction.DOWN)
   })
   test('should return correct obj for equal strings values', ()=>{
     const r = fn(_fValueMoving(
       '100', '100'
     ));

     expect(r.value).toBe('100')
     expect(r.percent).toBe(PERCENT_0)
     expect(r.delta).toBe('0')
     expect(r.direction).toBe(Direction.EQUAL)
   })

   test('should replace blanks in string values', ()=>{
     const r = fn(_fValueMoving(
       '200 000 000', '100 000 000'
     ));

     expect(r.value).toBe('200000000')
     expect(r.percent).toBe(PERCENT_100)
     expect(r.delta).toBe('100000000')
     expect(r.direction).toBe(Direction.UP)
   })
   test('should replace several blanks in string values', ()=>{
     const r = fn(_fValueMoving(
       '200  000  000', '100  000  000'
     ));

     expect(r.value).toBe('200000000')
     expect(r.percent).toBe(PERCENT_100)
     expect(r.delta).toBe('100000000')
     expect(r.direction).toBe(Direction.UP)
   })
   test('should to fixed to radix 0 value and round delta in case value or delta bigger 1 000 000', ()=>{
     const r = fn(_fValueMoving(
       '200 000 000.02', '100 000 000.01'
     ))

     expect(r.value).toBe('200000000')
     expect(r.percent).toBe(PERCENT_100)
     expect(r.delta).toBe('100000000')
     expect(r.direction).toBe(Direction.UP)
   })

   test('should use 0 values in edge cases', ()=>{
     const r = fn({ Direction })

     expect(r.value).toBe('0')
     expect(r.percent).toBe(PERCENT_0)
     expect(r.delta).toBe('0')
     expect(r.direction).toBe(Direction.EQUAL)
   })

})

describe('toFixed', () => {
  const fn = toFixed;
  test('should return fixed by 0 number for values > 10', () => {
    expect(fn(102.34)).toBe(102)
    expect(fn('102.34')).toBe(102)
    expect(fn(10.234)).toBe(10)
    expect(fn('10.234')).toBe(10)
  })
  test('should return fixed by 2 number for values =< 10', () => {
    expect(fn(1.234)).toBe(1.23)
    expect(fn('1.234')).toBe(1.23)
    expect(fn(0.1234)).toBe(0.12)
    expect(fn('0.1234')).toBe(0.12)
    expect(fn(0.01234)).toBe(0.01)
    expect(fn('0.01234')).toBe(0.01)
  })
})

describe('toFixedNumber', ()=>{
  const fn = toFixedNumber;
  test('should return number rounded depend of value', ()=>{
    expect(fn(9.00005)).toBe(9.0001)
    expect(fn(9000.005)).toBe(9000.01)
    expect(fn(10000.005)).toBe(10000)
  })
})
