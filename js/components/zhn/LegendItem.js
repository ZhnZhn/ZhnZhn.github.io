"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

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

var _useStyles = function _useStyles(is, color) {
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
  var _ref2$item = _ref2.item,
      item = _ref2$item === void 0 ? {} : _ref2$item,
      onClickItem = _ref2.onClickItem;

  var color = item.color,
      name = item.name,
      isVisible = item.isVisible,
      _useState = (0, _react.useState)(isVisible),
      is = _useState[0],
      setIs = _useState[1],
      _useStyles2 = _useStyles(is, color),
      btStyle = _useStyles2[0],
      circleStyle = _useStyles2[1],
      _hClick = function _hClick() {
    onClickItem(item);
    setIs(function (v) {
      return !v;
    });
  };

  return _react["default"].createElement("button", {
    className: CL,
    style: btStyle,
    onClick: _hClick
  }, _react["default"].createElement("span", {
    style: (0, _extends2["default"])({}, S.CIRCLE, {}, circleStyle)
  }), _react["default"].createElement("span", {
    style: S.ITEM
  }, name));
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