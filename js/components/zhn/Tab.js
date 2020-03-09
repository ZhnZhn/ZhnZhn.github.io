"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _withTheme = _interopRequireDefault(require("../hoc/withTheme"));

//import PropTypes from "prop-types";
var TH_ID = 'ELEMENT';
var S = {
  LI: {
    "float": 'left',
    display: 'inline-block',
    backgroundColor: '#1b2836',
    color: 'gray',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 6,
    paddingBottom: 6,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    cursor: 'pointer',
    fontWeight: 'bold',
    borderTop: '2px solid gray',
    borderLeft: '2px solid gray',
    borderRight: '2px solid gray',
    borderBottom: 'none'
  },
  SELECTED: {
    borderTop: '2px solid #a487d4',
    borderLeft: '2px solid #a487d4',
    borderRight: '2px solid #a487d4',
    color: '#a487d4'
  }
};

var Tab = function Tab(_ref) {
  var theme = _ref.theme,
      title = _ref.title,
      isSelected = _ref.isSelected,
      onClick = _ref.onClick;
  var TS = theme.getStyle(TH_ID);

  var _selectedStyle = isSelected ? S.SELECTED : null;

  return _react["default"].createElement("li", {
    style: (0, _extends2["default"])({}, S.LI, {}, TS.BG, {}, _selectedStyle),
    onClick: onClick
  }, _react["default"].createElement("span", null, title));
};
/*
Tab.propTypes = {
  title: PropTypes.string,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func
}
*/


var _default = (0, _withTheme["default"])(Tab);

exports["default"] = _default;
//# sourceMappingURL=Tab.js.map