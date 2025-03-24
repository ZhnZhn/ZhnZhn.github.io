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

  test("should promisify value n case of argument isPromosify", async () => {
    const _value = { v: "value" }
    , _crValue = jest.fn(() => Promise
      .resolve(_value)
    )
    , _getValue = fn(_crValue, true);

    let _result = await _getValue();
    expect(_result).toBe(_value)
    _result = await _getValue();
    expect(_result).toBe(_value)
    _result = await _getValue();
    expect(_result).toBe(_value)
    expect(_crValue).toBeCalledTimes(1)
  })

  test("should try recreat value in case promisify set void 0", async () => {
    let i = 0;
    const _crValue = jest.fn(() => Promise
      .resolve(i<2 ? (i++, void 0) : i)
    )
    , _getValue = fn(_crValue, true);

    let _result = await _getValue();
    expect(_result).toBe()
    _result = await _getValue();
    expect(_result).toBe()
    _result = await _getValue();
    expect(_result).toBe(2)

    _result = await _getValue();
    expect(_result).toBe(2)
    _result = await _getValue();
    expect(_result).toBe(2)

    expect(_crValue).toBeCalledTimes(3)
  })
})
