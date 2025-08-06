"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _styleFn = require("../styleFn");
var _ModalPane = _interopRequireDefault(require("./ModalPane"));
var _CellColorPane = _interopRequireDefault(require("./CellColorPane"));
var _jsxRuntime = require("react/jsx-runtime");
const S_MODAL_POPUP = {
  ...(0, _styleFn.crAbsoluteTopLeftStyle)(38, -10),
  zIndex: 1010
};
const ModalPalette = _ref => {
  let {
    isShow,
    model,
    onClickCell,
    onClose
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalPane.default, {
    isShow: isShow,
    style: S_MODAL_POPUP,
    onClose: onClose,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CellColorPane.default, {
      model: model,
      onClickCell: onClickCell
    })
  });
};
var _default = exports.default = ModalPalette;
//# sourceMappingURL=ModalPalette.js.map