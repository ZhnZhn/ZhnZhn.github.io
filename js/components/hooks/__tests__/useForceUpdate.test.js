"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("@testing-library/react");

var _useForceUpdate = _interopRequireDefault(require("../useForceUpdate"));

var _testRender = function _testRender(renderSpy, fns, calledTimes) {
  expect(renderSpy).toBeCalledTimes(calledTimes);
  expect(fns.size).toBe(1);
  expect(typeof Array.from(fns)[0]).toBe('function');
};

var _testFireClick = function _testFireClick(getByTestId, fns, renderSpy, calledTimes) {
  _react.fireEvent.click(getByTestId("bt"));

  _testRender(renderSpy, fns, calledTimes);
};

describe('useForceUpdate', function () {
  test('should return same function and rerender component when called', function () {
    var fns = new Set(),
        renderSpy = jest.fn();

    function Comp() {
      var forceUpdate = (0, _useForceUpdate["default"])();
      fns.add(forceUpdate);
      renderSpy();
      return /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        "data-testid": "bt",
        onClick: forceUpdate,
        children: "Rerender"
      });
    }

    var _render = (0, _react.render)( /*#__PURE__*/(0, _jsxRuntime.jsx)(Comp, {})),
        getByTestId = _render.getByTestId;

    _testRender(renderSpy, fns, 1);

    var _testRerender = _testFireClick.bind(null, getByTestId, fns, renderSpy);

    _testRerender(2);

    _testRerender(3);
  });
});
//# sourceMappingURL=useForceUpdate.test.js.map