import {
  getFromDate,
  getToDate,
  getDaysFromYmd
} from '../DateUtils';

import mockDateBeforeAll from './mockDateBeforeAll'

describe('DateUtilsWithMock', ()=>{
  test('', ()=>expect('').toBe(''))
})

const DateUtilsWithMock = () => {
  describe('getFromDate', ()=>{
    const fn = getFromDate
    //2020-01-01 12:00:01
    mockDateBeforeAll(2020,0,1,12,0,1)

    test('should return str in format YYYY-MM-DD minusYear', ()=> {
      expect(fn(2, new Date('2020-01-01'))).toBe('2018-01-01')
      expect(fn(void 0, new Date('2020-01-01'))).toBe('2018-01-01')
    })

    test('getToDate should return current Date as YYYY-MM-DD', () => {
      expect(getToDate()).toBe('2020-01-01')
    })

    test('getDaysFromYmd should return number of days to current Date', ()=>{
      const fn = getDaysFromYmd
      expect(fn('2020-01-01')).toBe(1)
      expect(fn('2019-12-31')).toBe(2)
      expect(fn('2019-12-30')).toBe(3)
    })
  })
}

export default DateUtilsWithMock
