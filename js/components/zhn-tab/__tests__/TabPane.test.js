/**
 * @jest-environment jsdom
 */
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("@testing-library/jest-dom");

var _zhnTestUtils = _interopRequireDefault(require("../../_test-utils/zhn-test-utils"));

var _TabPane = _interopRequireDefault(require("../TabPane"));

var _Tab = _interopRequireDefault(require("../Tab"));

var _jsxRuntime = require("react/jsx-runtime");

const {
  createRef,
  render,
  screen,
  fireClick
} = _zhnTestUtils.default;
const SELECTED_STYLE = "font-weight: bold";

const Comp = ({
  text,
  isSelected
}) => {
  const style = isSelected ? {
    fontWeight: 'bold '
  } : void 0;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: style,
    children: text
  });
};

const _getComps = screen => [screen.getByText("Comp1"), screen.getByText("Comp2")];

describe('TabPane', () => {
  test('should render TabPane and show-hide Comps by clicking on Tabs', () => {
    const refTabPane = createRef();
    render( /*#__PURE__*/(0, _jsxRuntime.jsxs)(_TabPane.default, {
      ref: refTabPane,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Tab.default, {
        title: "Tab1",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(Comp, {
          text: "Comp1"
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Tab.default, {
        title: "Tab2",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(Comp, {
          text: "Comp2"
        })
      })]
    }));
    let comp1, comp2;
    [comp1, comp2] = _getComps(screen);
    expect(comp1).toBeVisible();
    expect(comp1).toHaveStyle(SELECTED_STYLE);
    expect(comp2).not.toBeVisible();
    expect(comp2).not.toHaveStyle(SELECTED_STYLE);
    expect(refTabPane.current.getSelectedTabIndex()).toBe(0);
    fireClick(screen.getByText("Tab2"));
    [comp1, comp2] = _getComps(screen);
    expect(comp1).not.toBeVisible();
    expect(comp1).not.toHaveStyle(SELECTED_STYLE);
    expect(comp2).toBeVisible();
    expect(comp2).toHaveStyle(SELECTED_STYLE);
    expect(refTabPane.current.getSelectedTabIndex()).toBe(1);
    fireClick(screen.getByText("Tab1"));
    [comp1, comp2] = _getComps(screen);
    expect(comp1).toBeVisible();
    expect(comp1).toHaveStyle(SELECTED_STYLE);
    expect(comp2).not.toBeVisible();
    expect(comp2).not.toHaveStyle(SELECTED_STYLE);
    expect(refTabPane.current.getSelectedTabIndex()).toBe(0);
  });
});
//# sourceMappingURL=TabPane.test.js.map