"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

//import PropTypes from "prop-types";
var CL = "tabpane__tabs";
var S = {
  UL: {
    listStyle: 'outside none none',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 5,
    borderBottom: '2px solid rgba(164, 135, 212, 1)'
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
    return /*#__PURE__*/_react["default"].cloneElement(tab, {
      key: index,
      onClick: hClickTab.bind(null, index),
      isSelected: index === selectedTabIndex
    });
  });
};

var _renderComponents = function _renderComponents(children, selectedTabIndex) {
  return children.map(function (tab, index) {
    var _isSelected = index === selectedTabIndex,
        _divStyle = _isSelected ? S.BLOCK : S.NONE;

    return /*#__PURE__*/_react["default"].createElement("div", {
      style: _divStyle,
      key: 'a' + index
    }, /*#__PURE__*/_react["default"].cloneElement(tab.props.children, {
      key: 'comp' + index,
      isSelected: _isSelected
    }));
  });
};

var TabPane = /*#__PURE__*/_react["default"].forwardRef(function (_ref, ref) {
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
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      width: width,
      height: height
    }
  }, /*#__PURE__*/_react["default"].createElement("ul", {
    className: CL,
    style: S.UL
  }, _renderTabs(children, selectedTabIndex, _hClickTab)), /*#__PURE__*/_react["default"].createElement("div", {
    style: S.DIV
  }, _renderComponents(children, selectedTabIndex)));
});
/*
TabPane.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.node)
}
*/


var _default = TabPane;
exports["default"] = _default;
//# sourceMappingURL=TabPane.js.map