"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useProperty = require("../hooks/useProperty");
var _BtSvgCircle = require("../zhn/BtSvgCircle");
var _RowInputColor = _interopRequireDefault(require("../dialogs/RowInputColor"));
var _RowOpenClose = require("./RowOpenClose");
var _jsxRuntime = require("react/jsx-runtime");
const DF_COLOR = '#2b908f',
  S_INPUT_COLOR = {
    paddingLeft: 10
  };
const useRowTypeA = function (mathFn, getChart, dfColor) {
  if (dfColor === void 0) {
    dfColor = DF_COLOR;
  }
  const [is, setIs] = (0, _uiApi.useState)(false),
    [setColor, getColor] = (0, _useProperty.useProperty)(dfColor),
    _onPlus = () => {
      setIs(mathFn(getChart(), getColor()));
    },
    compAfter = is ? null : /*#__PURE__*/(0, _jsxRuntime.jsx)(_BtSvgCircle.SvgPlus, {
      onClick: _onPlus
    });
  return [dfColor, compAfter, setColor];
};
const RowTypeA = props => {
  const [dfColor, compAfter, onColor] = useRowTypeA(props.mathFn, props.getChart, props.dfColor);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowOpenClose.RowOpenClose, {
    caption: props.caption,
    CompAfter: compAfter,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowInputColor.default, {
      style: S_INPUT_COLOR,
      initValue: dfColor,
      onEnter: onColor
    })
  });
};
var _default = exports.default = RowTypeA;
//# sourceMappingURL=RowTypeA.js.map