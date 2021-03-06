"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _ModalPopup = _interopRequireDefault(require("./ModalPopup"));

var _CellColorPane = _interopRequireDefault(require("./CellColorPane"));

var S = {
  SHOW_HIDE: {
    zIndex: 1010,
    position: 'absolute',
    top: 35,
    left: -10,
    backgroundColor: 'inherit',
    borderRadius: 5,
    boxShadow: 'rgba(0, 0, 0, 0.2) 0 0 0 5px'
  }
};

var ModalPalette = function ModalPalette(_ref) {
  var isShow = _ref.isShow,
      model = _ref.model,
      onClickCell = _ref.onClickCell,
      onClose = _ref.onClose;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalPopup["default"], {
    style: S.SHOW_HIDE,
    isShow: isShow,
    onClose: onClose,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CellColorPane["default"], {
      model: model,
      onClickCell: onClickCell
    })
  });
};

var _default = ModalPalette;
exports["default"] = _default;
//# sourceMappingURL=ModalPalette.js.map