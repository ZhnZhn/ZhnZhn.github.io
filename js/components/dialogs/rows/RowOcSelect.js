"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _OpenClose = _interopRequireDefault(require("../../zhn/OpenClose"));

var _InputSelect = _interopRequireDefault(require("../../zhn-select/InputSelect"));

var _crRowOptions2 = _interopRequireDefault(require("./crRowOptions"));

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

  var _crRowOptions = (0, _crRowOptions2["default"])(restProps, {
    isOc: true
  }),
      rowStyle = _crRowOptions.rowStyle,
      labelStyle = _crRowOptions.labelStyle,
      caption = _crRowOptions.caption,
      options = _crRowOptions.options,
      _ocStyle = (0, _extends2["default"])({}, S.OC, labelStyle, restProps.labelStyle);

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_OpenClose["default"], {
    caption: caption,
    style: rowStyle,
    ocStyle: _ocStyle,
    captionStyle: S.CAPTION,
    openColor: C_OPEN,
    CompAfter: /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputSelect["default"], (0, _extends2["default"])({}, options)),
    children: children
  });
};

var _default = RowOcSelect;
exports["default"] = _default;
//# sourceMappingURL=RowOcSelect.js.map