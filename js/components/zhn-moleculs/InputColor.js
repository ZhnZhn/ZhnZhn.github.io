"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _useBool = require("../hooks/useBool");
var _CellColor = _interopRequireDefault(require("./CellColor"));
var _ModalPalette = _interopRequireDefault(require("./ModalPalette"));
var _jsxRuntime = require("react/jsx-runtime");
const InputColor = _ref => {
  let {
    className,
    model,
    color,
    setColor
  } = _ref;
  const [_isShowPallete, _hOpenPallete, _hClosePalette] = (0, _useBool.useBool)(false);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_CellColor.default, {
    className: className,
    color: color,
    onClick: _hOpenPallete,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalPalette.default, {
      isShow: _isShowPallete,
      model: model,
      onClickCell: setColor,
      onClose: _hClosePalette
    })
  });
};
var _default = exports.default = InputColor;
//# sourceMappingURL=InputColor.js.map