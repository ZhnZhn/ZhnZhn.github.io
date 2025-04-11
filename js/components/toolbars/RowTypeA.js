"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useProperty = require("../hooks/useProperty");
var _BtSvgCircle = require("../zhn/BtSvgCircle");
var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));
var _RowOpenClose = require("./RowOpenClose");
var _jsxRuntime = require("react/jsx-runtime");
const DF_COLOR = '#2b908f',
  S_INPUT_COLOR = {
    paddingLeft: 10
  };
const useRowTypeA = (mathFn, getChart, dfColor) => {
  const [is, setIs] = (0, _uiApi.useState)(false),
    [setColor, getColor] = (0, _useProperty.useProperty)(dfColor),
    _onPlus = () => {
      setIs(mathFn(getChart(), getColor()));
    },
    compAfter = is ? null : /*#__PURE__*/(0, _jsxRuntime.jsx)(_BtSvgCircle.SvgPlus, {
      onClick: _onPlus
    });
  return [compAfter, setColor];
};
const RowTypeA = _ref => {
  let {
    caption,
    dfColor = DF_COLOR,
    mathFn,
    getChart
  } = _ref;
  const [compAfter, onColor] = useRowTypeA(mathFn, getChart, dfColor);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowOpenClose.RowOpenClose, {
    caption: caption,
    CompAfter: compAfter,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowInputColor, {
      style: S_INPUT_COLOR,
      initValue: dfColor,
      onEnter: onColor
    })
  });
};
var _default = exports.default = RowTypeA;
//# sourceMappingURL=RowTypeA.js.map