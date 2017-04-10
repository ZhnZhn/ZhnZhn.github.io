import Big from 'big.js'
import mathFn from '../mathFn'
import { Direction } from '../../constants/Type'

describe('calcPercent', ()=>{
  const fn = mathFn.calcPercent
  test('should return str percent with Fixed 2 from Big values', ()=>{
     const r = fn({ bValue: Big(10), bTotal: Big(100)})
     expect(r).toBe('10.00')
  })
})

describe('crValueMoving', () => {
   const fn = mathFn.crValueMoving
   test('should return correct obj for strings values', ()=>{
     const r = fn({ nowValue: '200.02', prevValue: '100.01', Direction })

     expect(r.value).toBe('200.02')
     expect(r.percent).toBe('100.00%')
     expect(r.delta).toBe('100.01')
     expect(r.direction).toBe(Direction.UP)
   })
   test('should return correct obj for Big values', ()=>{
     const r = fn({ nowValue: Big('200.02'), prevValue: Big('100.01'), Direction })

     expect(r.value).toBe('200.02')
     expect(r.percent).toBe('100.00%')
     expect(r.delta).toBe('100.01')
     expect(r.direction).toBe(Direction.UP)
   })

   test('should return correct obj for strings values', ()=>{
     const r = fn({ nowValue: '0', prevValue: '100', Direction })

     expect(r.value).toBe('0')
     expect(r.percent).toBe('100.00%')
     expect(r.delta).toBe('100')
     expect(r.direction).toBe(Direction.DOWN)
   })
   test('should return correct obj for strings values', ()=>{
     const r = fn({ nowValue: '100', prevValue: '100', Direction })

     expect(r.value).toBe('100')
     expect(r.percent).toBe('0.00%')
     expect(r.delta).toBe('0')
     expect(r.direction).toBe(Direction.EQUAL)
   })

   test('should use 0 values in edge cases', ()=>{
     const r = fn({ Direction })

     expect(r.value).toBe('0')
     expect(r.percent).toBe('0.00%')
     expect(r.delta).toBe('0')
     expect(r.direction).toBe(Direction.EQUAL)
   })

})
