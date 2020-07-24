"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var CL_BT = 'zhn-select__bt-arrow';
var S = {
  ARROW_CELL: {
    position: 'absolute',
    top: 10,
    right: 0,
    width: 35,
    paddingRight: 5,
    textAlign: 'center',
    verticalAlign: 'middle',
    cursor: 'pointer'
  },
  ARROW: {
    position: 'relative',
    top: 2,
    display: 'inline-block',
    height: 0,
    width: 0,
    borderColor: '#999 transparent transparent',
    borderStyle: 'solid',
    borderWidth: '10px 8px 4px'
  }
};

var ArrowCell = function ArrowCell(_ref) {
  var arrowStyle = _ref.arrowStyle,
      _ref$tabIndex = _ref.tabIndex,
      tabIndex = _ref$tabIndex === void 0 ? "-1" : _ref$tabIndex,
      onClick = _ref.onClick;
  return /*#__PURE__*/_react["default"].createElement("button", {
    className: CL_BT,
    style: S.ARROW_CELL,
    tabIndex: tabIndex,
    onClick: onClick
  }, /*#__PURE__*/_react["default"].createElement("span", {
    style: (0, _extends2["default"])({}, S.ARROW, arrowStyle)
  }));
};

var _default = ArrowCell;
exports["default"] = _default;
//# sourceMappingURL=ArrowCell.js.map