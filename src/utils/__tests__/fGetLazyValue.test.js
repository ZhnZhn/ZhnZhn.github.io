import { fGetLazyValue } from "../fGetLazyValue";

describe("fGetLazyValue", ()=>{
  const fn = fGetLazyValue;
  test("should return function that get value created only once", () => {
    const _crValue = jest.fn(() => ({ v: "value" }))
    , _getValue = fn(_crValue)
    , _value = _getValue();

    expect(_value).toEqual(_crValue())
    expect(_getValue()).toBe(_value)
    expect(_getValue()).toBe(_value)
    expect(_getValue()).toBe(_value)
    expect(_crValue).toBeCalledTimes(2)
  })

  test("should promisify value n case of argument isPromosify", () => {
    const _crValue = jest.fn(() => Promise.resolve({ v: "value" }))
    , _getValue = fn(_crValue, true)

    expect(typeof _getValue().then).toBe("function")
    expect(typeof _getValue().then).toBe("function")
    expect(_crValue).toBeCalledTimes(1)
  })
})
