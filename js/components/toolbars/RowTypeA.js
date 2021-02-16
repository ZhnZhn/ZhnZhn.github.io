"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _useProperty2 = _interopRequireDefault(require("../hooks/useProperty"));

var _A = _interopRequireDefault(require("../zhn/A"));

var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));

var DF_COLOR = '#2b908f';
var OC_COLOR = 'black';
var S = {
  //OC
  ROOT_OC: {
    lineHeight: 'unset',
    paddingBottom: 4,
    marginLeft: -8
  },
  OC: {
    display: 'inline-block',
    height: 32,
    paddingTop: 4,
    width: 'auto',
    paddingRight: 8,
    marginRight: 6
  },
  CAPTION: {
    color: OC_COLOR
  },
  //INPUT_COLOR
  COLOR: {
    paddingLeft: 10
  }
};

var _useRowTypeA = function _useRowTypeA(mathFn, getChart, dfColor) {
  var _useState = (0, _react.useState)(false),
      is = _useState[0],
      setIs = _useState[1],
      _useProperty = (0, _useProperty2["default"])(dfColor),
      setColor = _useProperty[0],
      getColor = _useProperty[1],
      _onPlus = function _onPlus() {
    setIs(mathFn(getChart(), getColor()));
  },
      compAfter = is ? null : /*#__PURE__*/(0, _jsxRuntime.jsx)(_A["default"].SvgPlus, {
    onClick: _onPlus
  });

  return [compAfter, setColor];
};

var RowTypeA = function RowTypeA(_ref) {
  var caption = _ref.caption,
      _ref$dfColor = _ref.dfColor,
      dfColor = _ref$dfColor === void 0 ? DF_COLOR : _ref$dfColor,
      mathFn = _ref.mathFn,
      getChart = _ref.getChart;

  var _useRowTypeA2 = _useRowTypeA(mathFn, getChart, dfColor),
      compAfter = _useRowTypeA2[0],
      onColor = _useRowTypeA2[1];

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_A["default"].OpenClose, {
    caption: caption,
    style: S.ROOT_OC,
    ocStyle: S.OC,
    captionStyle: S.CAPTION,
    openColor: OC_COLOR,
    CompAfter: compAfter,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].RowInputColor, {
      style: S.COLOR,
      initValue: dfColor,
      onEnter: onColor
    })
  });
};

var _default = RowTypeA;
exports["default"] = _default;
//# sourceMappingURL=RowTypeA.js.map