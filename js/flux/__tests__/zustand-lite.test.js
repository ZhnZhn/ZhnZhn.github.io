"use strict";

var _zustandLite = require("../zustand-lite");
describe("createStore", () => {
  const fn = _zustandLite.createStore;
  test('create a store', () => {
    let params;
    const store = fn(function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      params = args;
      return {
        value: null
      };
    });
    expect({
      params,
      store
    }).toMatchInlineSnapshot(`
      {
        "params": [
          [Function],
          [Function],
          {
            "getState": [Function],
            "setState": [Function],
            "subscribe": [Function],
          },
        ],
        "store": {
          "getState": [Function],
          "setState": [Function],
          "subscribe": [Function],
        },
      }
    `);
  });
  test('uses the store', () => {
    const {
      getState
    } = fn(set => ({
      count: 0,
      inc: () => set(state => ({
        count: state.count + 1
      }))
    }));
    getState().inc();
    expect(getState().count).toBe(1);
  });
  test('can get the store', () => {
    const {
      getState
    } = fn((_, get) => ({
      value: 1,
      getState1: () => get(),
      getState2: () => getState()
    }));
    expect(getState().getState1().value).toBe(1);
    expect(getState().getState2().value).toBe(1);
  });
  test('can set the store', () => {
    const {
      getState,
      setState
    } = fn(set => ({
      value: 1,
      setState1: v => set(v),
      setState2: v => setState(v)
    }));
    getState().setState1({
      value: 2
    });
    expect(getState().value).toBe(2);
    getState().setState2({
      value: 3
    });
    expect(getState().value).toBe(3);
  });
  test('both NaN should not update', () => {
    const {
        setState,
        subscribe
      } = fn(() => NaN),
      _onSubscribe = jest.fn();
    subscribe(_onSubscribe);
    setState(NaN);
    expect(_onSubscribe).not.toBeCalled();
  });
  test('can set the store without merging', () => {
    const {
      getState,
      setState
    } = fn(() => ({
      a: 1
    }));

    // Should override the state instead of merging.
    setState({
      b: 2
    }, true);
    expect(getState()).toEqual({
      b: 2
    });
  });
  test('can set the object store to null', () => {
    const {
      getState,
      setState
    } = fn(() => ({
      a: 1
    }));
    setState(null);
    expect(getState()).toEqual(null);
  });
  test('can set the non-object store to null', () => {
    const {
      getState,
      setState
    } = fn(() => 'value');
    setState(null);
    expect(getState()).toEqual(null);
  });
  test('works with non-object state', () => {
    const {
        getState,
        setState
      } = fn(() => 1),
      inc = () => setState(v => v + 1);
    inc();
    expect(getState()).toBe(2);
  });
});
//# sourceMappingURL=zustand-lite.test.js.map