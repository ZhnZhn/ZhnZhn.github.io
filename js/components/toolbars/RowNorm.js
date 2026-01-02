"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _objFn = require("../../utils/objFn");
var _dateFn = require("../../utils/dateFn");
var _uiApi = require("../uiApi");
var _styleFn = require("../styleFn");
var _useProperty = require("../hooks/useProperty");
var _BtSvgCircle = require("../zhn/BtSvgCircle");
var _InputDmy = _interopRequireDefault(require("../zhn/InputDmy"));
var _fRowFn = _interopRequireDefault(require("./fRowFn"));
var _RowOpenClose = require("./RowOpenClose");
var _jsxRuntime = require("react/jsx-runtime");
const S_PL_12 = {
  paddingLeft: 12
};
const RowNorm = _ref => {
  let {
    is,
    caption,
    getChart,
    onPlus,
    onMinus
  } = _ref;
  const refEl = (0, _uiApi.useRef)(),
    _inputDmyInitialValue = (0, _useProperty.useRefInit)(() => (0, _dateFn.mlsToDmy)((0, _objFn.getByPropsFrom)(getChart(), "series", 0, "data", 0, "x"))),
    _onPlus = () => {
      onPlus({}, (0, _uiApi.getInputValidValue)(refEl));
    },
    _onEnter = () => {
      if ((0, _uiApi.isInputValid)(refEl)) {
        if (is) {
          onMinus();
        } else {
          _onPlus();
        }
      }
    };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowOpenClose.RowOpenClose, {
    caption: caption,
    CompAfter: is ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_BtSvgCircle.SvgMinus, {
      style: _styleFn.S_INLINE,
      onClick: onMinus
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_BtSvgCircle.SvgPlus, {
      style: _styleFn.S_INLINE,
      onClick: _onPlus
    }),
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: S_PL_12,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputDmy.default, {
        refEl: refEl,
        caption: "CompareTo:",
        initialValue: _inputDmyInitialValue,
        onEnter: _onEnter
      })
    })
  });
};
var _default = exports.default = (0, _fRowFn.default)(RowNorm);
//# sourceMappingURL=RowNorm.js.map