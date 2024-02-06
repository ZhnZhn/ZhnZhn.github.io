import {
  createStoreWithSelector,
  getStoreApi,
  fCrStoreSlice
} from '../storeApi';

describe("createStoreWithSelector", () => {
  const fn = createStoreWithSelector;
  test("should create store", () => {
    const _initialStore = { v: "value", c: 0, is: false }
    , _crStore = () => _initialStore
    , { getState, setState } = fn(_crStore);

    expect(getState()).toEqual(_initialStore)

    setState({ v: "newValue", is: true })
    expect(getState()).toEqual({
      v: "newValue", c: 0, is: true
    })
  })
})

describe("getStoreApi", () => {
  const fn = getStoreApi;
  test('should return tuple with store api functions', () => {
    const store = createStoreWithSelector(() => ({}))
    , [setState, getState] = fn(store);

    expect(typeof setState).toBe("function")
    expect(setState).toEqual(store.setState)
    expect(typeof getState).toBe("function")
    expect(getState).toEqual(store.getState)
  })
})

describe("fCrStoreSlice", () => {
  const fn = fCrStoreSlice;
  test("should return array with crSlice and selector functions", () => {
    const SLICE_TEST = "test"
    , [
      crTestSlice,
      selectTestSlice
    ] = fn(SLICE_TEST);

    const msTest1 = void 0;
    expect(selectTestSlice({...crTestSlice(msTest1)}))
     .toEqual(msTest1)
    const msTest2 = "a";
    expect(selectTestSlice({...crTestSlice(msTest2)}))
       .toEqual(msTest2)
    const msTest3 = {a: "a", b: "b"};
    expect(selectTestSlice({...crTestSlice(msTest3)}))
      .toEqual(msTest3)
  })


  test("should use propName parameter", () => {
    const SLICE_TEST = "test"
    , PN = "id"
    , [
      crTestSlice,
      selectTestSlice
    ] = fn(SLICE_TEST, PN);

    const msTest1 = void 0
    expect(selectTestSlice({...crTestSlice(msTest1)}))
      .toEqual({ [PN]: msTest1})
    const msTest2 = "someId";
    expect(selectTestSlice({...crTestSlice(msTest2)}))
      .toEqual({ [PN]: msTest2})
    const msTest3 = {a: "a", "b": "b"}
    expect(selectTestSlice({...crTestSlice(msTest3)}))
      .toEqual({ [PN]: msTest3})
  })
})
