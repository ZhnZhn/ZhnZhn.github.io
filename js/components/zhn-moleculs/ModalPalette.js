"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _ModalPopup = _interopRequireDefault(require("./ModalPopup"));

var _CellColorPane = _interopRequireDefault(require("./CellColorPane"));

var _jsxRuntime = require("react/jsx-runtime");

const S_MODAL_POPUP = {
  zIndex: 1010,
  position: 'absolute',
  top: 35,
  left: -10,
  backgroundColor: 'inherit',
  borderRadius: 5,
  boxShadow: 'rgba(0, 0, 0, 0.2) 0 0 0 5px'
};

const ModalPalette = ({
  isShow,
  model,
  onClickCell,
  onClose
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalPopup.default, {
  style: S_MODAL_POPUP,
  isShow: isShow,
  onClose: onClose,
  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CellColorPane.default, {
    model: model,
    onClickCell: onClickCell
  })
});

var _default = ModalPalette;
exports.default = _default;
//# sourceMappingURL=ModalPalette.js.map