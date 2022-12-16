"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _jsxRuntime = require("react/jsx-runtime");
const S_TABS = {
    margin: '5px 5px 10px 24px'
  },
  S_COMPONENTS = {
    width: "100%",
    height: "100%"
  },
  S_BLOCK = {
    display: 'block',
    width: "100%",
    height: "100%"
  },
  S_NONE = {
    display: 'none'
  };
const TabPane = _ref => {
  let {
    width,
    height,
    children
  } = _ref;
  const [selectedTabIndex, setSelectedTabIndex] = (0, _uiApi.useState)(0),
    _isSelectedTabIndex = index => index === selectedTabIndex;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: {
      width,
      height
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: S_TABS,
      children: children.map((tab, index) => (0, _uiApi.cloneElement)(tab, {
        key: index,
        id: index,
        onClick: () => setSelectedTabIndex(index),
        isSelected: _isSelectedTabIndex(index)
      }))
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: S_COMPONENTS,
      children: children.map((tab, index) => {
        const isSelected = _isSelectedTabIndex(index);
        return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: isSelected ? S_BLOCK : S_NONE,
          role: "tabpanel",
          id: "tabpanel-" + index,
          "aria-labelledby": "tab-" + index,
          children: (0, _uiApi.cloneElement)(tab.props.children, {
            isSelected
          })
        }, index);
      })
    })]
  });
};
var _default = TabPane;
exports.default = _default;
//# sourceMappingURL=TabPane.js.map