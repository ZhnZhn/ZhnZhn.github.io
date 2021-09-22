"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from "prop-types";
const S_TABS = {
  marginTop: 5,
  marginRight: 5,
  marginBottom: 10,
  marginLeft: 24
},
      S_BLOCK = {
  display: 'block',
  width: "100%",
  height: "100%"
},
      S_NONE = {
  display: 'none'
},
      S_COMPONENTS = {
  width: "100%",
  height: "100%"
};

const _renderTabs = (children, selectedTabIndex, hClickTab) => children.map((tab, index) => /*#__PURE__*/(0, _react.cloneElement)(tab, {
  key: index,
  id: index,
  onClick: () => hClickTab(index),
  isSelected: index === selectedTabIndex
}));

const _renderComponents = (children, selectedTabIndex) => children.map((tab, index) => {
  const _isSelected = index === selectedTabIndex,
        _divStyle = _isSelected ? S_BLOCK : S_NONE;

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: _divStyle,
    role: "tabpanel",
    id: "tabpanel-" + index,
    "aria-labelledby": "tab-" + index,
    children: /*#__PURE__*/(0, _react.cloneElement)(tab.props.children, {
      isSelected: _isSelected
    })
  }, 'a' + index);
});

const TabPane = /*#__PURE__*/(0, _react.forwardRef)(({
  width,
  height,
  children
}, ref) => {
  const [selectedTabIndex, setSelectedTabIndex] = (0, _react.useState)(0);
  (0, _react.useImperativeHandle)(ref, () => ({
    getSelectedTabIndex: () => selectedTabIndex
  }), [selectedTabIndex]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: {
      width,
      height
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: S_TABS,
      children: _renderTabs(children, selectedTabIndex, setSelectedTabIndex)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: S_COMPONENTS,
      children: _renderComponents(children, selectedTabIndex)
    })]
  });
});
/*
TabPane.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  children: PropTypes.arrayOf(PropTypes.node)
}
*/

var _default = TabPane;
exports.default = _default;
//# sourceMappingURL=TabPane.js.map