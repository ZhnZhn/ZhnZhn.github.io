import {
  getRefValue,
  setRefValue,
  focusRefElement,
  isInputValid,
  getInputValue
} from '../uiApi';

describe("getRefValue", ()=>{
  const fn = getRefValue;
  test('should return ref value', ()=>{
    expect(fn()).toBe(void 0)
    expect(fn(null)).toBe(void 0)
    expect(fn({current: 'a'})).toBe('a')
  })
})

describe("setRefValue", ()=>{
  const fn = setRefValue
  test("should set value to ref", ()=>{
    const ref = { current: void 0 }
    , value = 'v';

    fn(ref, value)
    expect(ref.current).toBe(value)
  })
})

describe("focusRefElement", ()=>{
  const fn = focusRefElement
  , _crRefWithFocus = focus => ({
    current: { focus }
  });

  test('should call focus function from ref1', () => {
    const focus1 = jest.fn()
    , focus2 = jest.fn()
    , ref1 = _crRefWithFocus(focus1)
    , ref2 = _crRefWithFocus(focus2);

    fn(ref1, ref2)
    expect(focus1).toHaveBeenCalledTimes(1)
    expect(focus2).toHaveBeenCalledTimes(0)
  })

  test('should call focus function from ref2', ()=>{
    const focus2 = jest.fn()
    , ref2 = _crRefWithFocus(focus2);

    fn(void 0, ref2)
    expect(focus2).toHaveBeenCalledTimes(1)
  })
})


describe("isInputValid", ()=>{
  const fn = isInputValid
  test("should return valid boolean from ref instance", ()=>{
    expect(fn()).toBe(false)
    expect(fn(null)).toBe(false)
    expect(fn({current: void 0})).toBe(false)
    expect(fn({current: null})).toBe(false)

    expect(fn(
      {current: { isValid: () => true}}
    )).toBe(true)
    expect(fn(
      {current: { isValid: () => false}}
    )).toBe(false)
  })

  test("should retun false for wrong method name", ()=>{
    expect(fn(
      {current: { isInputValid: () => true}}
    )).toBe(false)
    expect(fn(
      {current: { is: () => true}}
    )).toBe(false)
  })
})

describe("getInputValue", ()=>{
  const fn = getInputValue
  test("should return input value from ref instance", ()=>{
    expect(fn()).toBe()
    expect(fn(null)).toBe()
    expect(fn({current: void 0})).toBe()
    expect(fn({current: null})).toBe()

    expect(fn({current: {
      getV: () => 'value'
    }})).toBe()

    expect(fn({current: {
      getValue: () => 'value'
    }})).toBe('value')
  })
})
