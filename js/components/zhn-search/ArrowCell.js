"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var S = {
  ARROW_CELL: {
    position: 'absolute',
    top: '10px',
    right: '0px',
    cursor: 'pointer',
    textAlign: 'center',
    verticalAlign: 'middle',
    width: '35px',
    paddingRight: '5px'
  },
  ARROW: {
    position: 'relative',
    top: '2px',
    borderColor: '#999 transparent transparent',
    borderStyle: 'solid',
    borderWidth: '10px 8px 4px',
    display: 'inline-block',
    height: '0px',
    width: '0px'
  }
};

var ArrowCell = function ArrowCell(_ref) {
  var arrowStyle = _ref.arrowStyle,
      _ref$tabIndex = _ref.tabIndex,
      tabIndex = _ref$tabIndex === void 0 ? "-1" : _ref$tabIndex,
      onClick = _ref.onClick;
  return /*#__PURE__*/_react["default"].createElement("button", {
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