"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _useToggle2 = _interopRequireDefault(require("../hooks/useToggle"));

//import PropTypes from "prop-types";
var CL = 'bt-item';
var S = {
  ITEM: {
    display: 'inline-block',
    paddingLeft: 5,
    paddingRight: 6
  },
  CIRCLE: {
    display: 'inline-block',
    backgroundColor: 'grey',
    width: 12,
    height: 12,
    marginLeft: 6,
    border: '1px solid grey',
    borderRadius: '50%'
  }
};
var DF_STYLES = ['grey', {}];
var DECOR_STYLE = {
  borderWidth: 2,
  fontWeight: 'bold'
};

var _crStyles = function _crStyles(is, color) {
  var _ref = is ? [color, DECOR_STYLE] : DF_STYLES,
      borderColor = _ref[0],
      _decorStyle = _ref[1];

  return [(0, _extends2["default"])({
    color: color,
    borderColor: borderColor
  }, _decorStyle), {
    backgroundColor: borderColor,
    borderColor: borderColor
  }];
};

var LegendItem = function LegendItem(_ref2) {
  var item = _ref2.item,
      onClickItem = _ref2.onClickItem;

  var _ref3 = item != null ? item : {},
      color = _ref3.color,
      name = _ref3.name,
      isVisible = _ref3.isVisible,
      _useToggle = (0, _useToggle2["default"])(isVisible),
      is = _useToggle[0],
      toggleIs = _useToggle[1],
      _crStyles2 = _crStyles(is, color),
      btStyle = _crStyles2[0],
      circleStyle = _crStyles2[1],
      _hClick = function _hClick() {
    onClickItem(item);
    toggleIs();
  };

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("button", {
    className: CL,
    style: btStyle,
    onClick: _hClick,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: (0, _extends2["default"])({}, S.CIRCLE, circleStyle)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: S.ITEM,
      children: name
    })]
  });
};
/*
LegendItem.propTypes = {
  item: PropTypes.shape({
    isVisible: PropTypes.bool,
    color: PropTypes.string,
    name: PropTypes.string
  })
  onClickItem: PropTypes.func
}
*/


var _default = LegendItem;
exports["default"] = _default;
//# sourceMappingURL=LegendItem.js.map