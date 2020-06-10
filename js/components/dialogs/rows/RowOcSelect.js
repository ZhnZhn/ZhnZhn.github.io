"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _react = _interopRequireDefault(require("react"));

var _OpenClose = _interopRequireDefault(require("../../zhn/OpenClose"));

var _InputSelect = _interopRequireDefault(require("../../zhn-select/InputSelect"));

var _useRowOptions2 = _interopRequireDefault(require("./useRowOptions"));

var C_OPEN = "#1b75bb";
var S = {
  OC: {
    verticalAlign: 'top',
    paddingTop: 6,
    paddingBottom: 10
  },
  CAPTION: {
    color: C_OPEN
  }
};

var RowOcSelect = function RowOcSelect(_ref) {
  var children = _ref.children,
      restProps = (0, _objectWithoutPropertiesLoose2["default"])(_ref, ["children"]);

  var _useRowOptions = (0, _useRowOptions2["default"])(restProps, {
    isOc: true
  }),
      rowStyle = _useRowOptions.rowStyle,
      labelStyle = _useRowOptions.labelStyle,
      caption = _useRowOptions.caption,
      options = _useRowOptions.options;

  return /*#__PURE__*/_react["default"].createElement(_OpenClose["default"], {
    isClose: true,
    rootStyle: rowStyle,
    ocStyle: (0, _extends2["default"])({}, S.OC, labelStyle),
    caption: caption,
    captionStyle: S.CAPTION,
    openColor: C_OPEN,
    CompAfter: /*#__PURE__*/_react["default"].createElement(_InputSelect["default"], options)
  }, children);
};

var _default = RowOcSelect;
exports["default"] = _default;
//# sourceMappingURL=RowOcSelect.js.map