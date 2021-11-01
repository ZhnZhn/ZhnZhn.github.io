/**
 * @jest-environment jsdom
 */
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = require("@testing-library/react");

var _useForceUpdate = _interopRequireDefault(require("../useForceUpdate"));

var _jsxRuntime = require("react/jsx-runtime");

const _testRender = (renderSpy, fns, calledTimes) => {
  expect(renderSpy).toBeCalledTimes(calledTimes);
  expect(fns.size).toBe(1);
  expect(typeof Array.from(fns)[0]).toBe('function');
};

const _testRenderAfterClickBt = (renderSpy, fns, calledTimes) => {
  _react.fireEvent.click(_react.screen.getByTestId("bt"));

  _testRender(renderSpy, fns, calledTimes);
};

describe('useForceUpdate', () => {
  test('should return same function and rerender component when called', () => {
    const fns = new Set(),
          renderSpy = jest.fn();

    function Comp() {
      const forceUpdate = (0, _useForceUpdate.default)();
      fns.add(forceUpdate);
      renderSpy();
      return /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        "data-testid": "bt",
        onClick: forceUpdate,
        children: "Rerender"
      });
    }

    (0, _react.render)( /*#__PURE__*/(0, _jsxRuntime.jsx)(Comp, {}));

    _testRender(renderSpy, fns, 1);

    _testRenderAfterClickBt(renderSpy, fns, 2);

    _testRenderAfterClickBt(renderSpy, fns, 3);
  });
});
//# sourceMappingURL=useForceUpdate.test.js.map