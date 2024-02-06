import {
  fCrStoreSlice
} from '../storeApi';

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
