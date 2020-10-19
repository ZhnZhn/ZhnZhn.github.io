"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

//import PropTypes from "prop-types";
var S = {
  TABS: {
    marginTop: 5,
    marginRight: 5,
    marginBottom: 10,
    marginLeft: 24
  },
  BLOCK: {
    display: 'block',
    width: "100%",
    height: "100%"
  },
  NONE: {
    display: 'none'
  },
  DIV: {
    width: "100%",
    height: "100%"
  }
};

var _renderTabs = function _renderTabs(children, selectedTabIndex, hClickTab) {
  return children.map(function (tab, index) {
    return /*#__PURE__*/(0, _react.cloneElement)(tab, {
      key: index,
      id: index,
      onClick: hClickTab.bind(null, index),
      isSelected: index === selectedTabIndex
    });
  });
};

var _renderComponents = function _renderComponents(children, selectedTabIndex) {
  return children.map(function (tab, index) {
    var _isSelected = index === selectedTabIndex,
        _divStyle = _isSelected ? S.BLOCK : S.NONE;

    return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: _divStyle,
      role: "tabpanel",
      id: "tabpanel-" + index,
      "aria-labelledby": "tab-" + index,
      children: /*#__PURE__*/(0, _react.cloneElement)(tab.props.children, {
        key: 'comp' + index,
        isSelected: _isSelected
      })
    }, 'a' + index);
  });
};

var TabPane = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var width = _ref.width,
      height = _ref.height,
      children = _ref.children;

  var _useState = (0, _react.useState)(0),
      selectedTabIndex = _useState[0],
      setSelectedTabIndex = _useState[1],
      _hClickTab = (0, _react.useCallback)(function (index) {
    return setSelectedTabIndex(index);
  }, []);

  (0, _react.useImperativeHandle)(ref, function () {
    return {
      getSelectedTabIndex: function getSelectedTabIndex() {
        return selectedTabIndex;
      }
    };
  }, [selectedTabIndex]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: {
      width: width,
      height: height
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: S.TABS,
      children: _renderTabs(children, selectedTabIndex, _hClickTab)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: S.DIV,
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
exports["default"] = _default;
//# sourceMappingURL=TabPane.js.map