"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _styleFn = require("../styleFn");
var _OpenClose = _interopRequireDefault(require("../zhn/OpenClose"));
var _BtSvgCircle = require("../zhn/BtSvgCircle");
var _Row = require("./Row.Style");
var _InputDmy = _interopRequireDefault(require("../zhn/InputDmy"));
var _fRowFn = _interopRequireDefault(require("./fRowFn"));
var _jsxRuntime = require("react/jsx-runtime");
const S_PL_12 = {
  paddingLeft: 12
};
const RowNorm = _ref => {
  let {
    is,
    caption,
    onPlus,
    onMinus
  } = _ref;
  const refEl = (0, _uiApi.useRef)(),
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
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_OpenClose.default, {
    caption: caption,
    className: _styleFn.CL_OPEN_CLOSE_BLACK,
    style: _Row.S_OPEN_CLOSE,
    ocStyle: _Row.S_OC_STYLE,
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
        onEnter: _onEnter
      })
    })
  });
};
var _default = exports.default = (0, _fRowFn.default)(RowNorm);
//# sourceMappingURL=RowNorm.js.map