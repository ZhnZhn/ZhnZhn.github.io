import AdapterFn from '../AdapterFn'

const {
  ymdToUTC,
  toUpperCaseFirst,
  isYNumber,
  findMinY,
  findMaxY,
  joinBy,
  getCaption,
  getValue
} = AdapterFn;

const Y = [
  { in: '2017', r: 1514678400000, d: '31-12-2017' },
  { in: '2016', r: 1483142400000, d: '31-12-2016' },
  { in: '2015', r: 1451520000000, d: '31-12-2015' },
  { in: '2000', r: 978220800000, d: '31-12-2000' },
]

//Date.UTC(y, m-1, d)
const YM = [
  { in: '2017-12', r: 1514678400000, d: '31-12-2017' },
  { in: '2017-11', r: 1512000000000, d: '30-11-2017' },
  { in: '2017-10', r: 1509408000000, d: '31-10-2017' },

  { in: '2017-9', r: 1506729600000, d: '30-09-2017' },
  { in: '2017-09', r: 1506729600000, d: '30-09-2017' },
  { in: '2017-8', r: 1504137600000, d: '31-08-2017' },
  { in: '2017-08', r: 1504137600000, d: '31-08-2017' },

  { in: '2017-1', r: 1485820800000, d: '31-01-2017' },
  { in: '2017-01', r: 1485820800000, d: '31-01-2017' },
];

const YMD = [
  { in: '2018-01-01', r: 1514764800000, d: '01-01-2018' },
  { in: '2018-1-01', r: 1514764800000, d: '01-01-2018' },
  { in: '2018-1-1', r: 1514764800000, d: '01-01-2018' },
  { in: '2018-01-01', r: 1514764800000, d: '01-01-2018' },
]

describe('ymdToUTC', () => {
  const fn = ymdToUTC;
  test('should return UTC msc of 31, December of year from YYYY', () => {
    Y.forEach(d => {
      expect(fn(d.in)).toBe(d.r)
    })
  })

  test('should return UTC msc of last day of month from YYYY-MM', () => {
    YM.forEach(d => {
      expect(fn(d.in)).toBe(d.r)
    })
  })

  test('should return UTC msc of day (00:00:00 UTC) from YYYY-MM-DD', () => {
    YMD.forEach(d => {
      expect(fn(d.in)).toBe(d.r)
    })
  })

});

describe('toUpperCaseFirst', ()=> {
  const fn = toUpperCaseFirst;
  const EMPTY = '';
  test('should return string with first upper case letter for string or String input', ()=>{
    expect(fn('abc')).toBe('Abc')
    expect(fn('aBc')).toBe('ABc')
    expect(fn('aBC')).toBe('ABC')
  })
  test('should retunr empty string for instance of String', ()=> {
    expect(fn(new String('abc'))).toBe('')
    expect(fn(new String('aBc'))).toBe('')
    expect(fn(new String('aBC'))).toBe('')
  })
  test('should return empty string in edge case', ()=>{
    expect(fn('')).toBe(EMPTY)
    expect(fn(undefined)).toBe(EMPTY)
    expect(fn(null)).toBe(EMPTY)
    expect(fn({})).toBe(EMPTY)
    expect(fn([])).toBe(EMPTY)

    expect(fn({str: 'abc'})).toBe(EMPTY)
    expect(fn(()=>{})).toBe(EMPTY)
    expect(fn(/\s/)).toBe(EMPTY)
    expect(fn(Date.now())).toBe(EMPTY)
  })

})

describe('isYNumber', () => {
  const fn = isYNumber
  test('should return true for object with property y number', () => {
    expect(fn({y: 10})).toBe(true)
    expect(fn({y: 1})).toBe(true)
    expect(fn({y: 0})).toBe(true)
    expect(fn({y: -1})).toBe(true)
  })
  test('should return false for object with property y not number', ()=>{
    expect(fn({y: null})).toBe(false)
    expect(fn({y: NaN})).toBe(false)
    expect(fn({y: 'str'})).toBe(false)
    expect(fn({y: undefined})).toBe(false)
    expect(fn({y: true})).toBe(false)
    expect(fn({y: false})).toBe(false)
    expect(fn({y: Number.POSITIVE_INFINITY})).toBe(false)
    expect(fn({y: Number.NEGATIVE_INFINITY})).toBe(false)
    expect(fn({y: []})).toBe(false)
    expect(fn({y: {}})).toBe(false)
    expect(fn({y: ()=>{} })).toBe(false)
  })
})

const DATA_ARR = [ [0, 0.3], [0, 0.31], [0, 0.29] ];
const DATA_POINT = [ {x:0, y: 0.3},{x:0, y: 0.31},{x:0, y: 0.29} ];

describe('findMinY', ()=>{
  const fn = findMinY;
  test('should return minY for points arrays', ()=>{
     expect(fn(DATA_ARR)).toBe(0.29)
  })
  test('should return minY for points object', ()=>{
    expect(fn(DATA_POINT)).toBe(0.29)
  })
  test('should return undefined in edge case', ()=>{
    expect(fn()).toBe(undefined)
    expect(fn([])).toBe(undefined)
    expect(fn([[0]])).toBe(undefined)
    expect(fn([{x:0}])).toBe(undefined)
  })
})

describe('findMaxY', ()=>{
  const fn = findMaxY;
  test('should return maxY for points arrays', ()=>{
     expect(fn(DATA_ARR)).toBe(0.31)
  })
  test('should return maxY for points object', ()=>{
    expect(fn(DATA_POINT)).toBe(0.31)
  })
  test('should return undefined in edge case', ()=>{
    expect(fn()).toBe(undefined)
    expect(fn([])).toBe(undefined)
    expect(fn([[0]])).toBe(undefined)
    expect(fn([{x:0}])).toBe(undefined)
  })
})

describe('joinBy', () => {
  test('should join by delimeter', () => {
    expect(joinBy('.')).toBe('')
    expect(joinBy('.', 'a')).toBe('a')
    expect(joinBy('.', 'a', 'b')).toBe('a.b')
  })
  test('should filter falsy values', () => {
    expect(joinBy('.', '', 'b', 'c')).toBe('b.c')
    expect(joinBy('.', null, 'b', 'c')).toBe('b.c')
    expect(joinBy('.', void 0, 'b', 'c')).toBe('b.c')
  })
})

describe('getCaption', ()=> {
  test('should return string item caption', ()=>{
    const fn = getCaption;
    expect(fn({ caption: 'Abc' })).toBe('Abc')
    expect(fn({ caption: '0' })).toBe('0')
    expect(fn({ caption: 0 })).toBe('0')
    expect(fn({})).toBe('')
    expect(fn()).toBe('')
    expect(fn(null)).toBe('')
  })
})

describe('getValue', ()=>{
  const fn = getValue;
  test('should return string item value', ()=>{
    expect(fn({ value: 'Abc'})).toBe('Abc')
    expect(fn({ value: '0'})).toBe('0')
    expect(fn({ value: 0})).toBe('0')

    expect(fn({})).toBe('')
    expect(fn()).toBe('')
    expect(fn(null)).toBe('')
  })

  test('should return string upperCase in case isUpper option', ()=>{
    const option = { isUpper: true };
    expect(fn({ value: 'Abc'}, option)).toBe('ABC')
    expect(fn({ value: '0'}, option)).toBe('0')
    expect(fn({ value: 0}, option)).toBe('0')

    expect(fn({}, option)).toBe('')
    expect(fn(void 0, option)).toBe('')
    expect(fn(null, option)).toBe('')
  })

  test('should return string inputValue in case value==="noresult"', ()=>{
    const item = { value: 'noresult' }
    expect(fn({ ...item, inputValue: 'Abc' })).toBe('Abc')

    expect(fn({ ...item, inputValue: '' })).toBe('')
    expect(fn({ ...item, inputValue: null })).toBe('')
    expect(fn({ ...item })).toBe('')
  })

  test('should use option isUpper for inputValue in case value==="noresult"', ()=>{
    const item = { value: 'noresult' }
    , option = { isUpper: true };
    expect(fn({ ...item, inputValue: 'Abc' }, option)).toBe('ABC')

    expect(fn({ ...item, inputValue: '' }, option)).toBe('')
    expect(fn({ ...item, inputValue: null }, option)).toBe('')
    expect(fn({ ...item}, option)).toBe('')
  })
})
