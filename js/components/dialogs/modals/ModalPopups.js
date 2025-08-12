"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.ModalPopupInputs = exports.ModalOptions = void 0;
var _ModalPopup = require("../../zhn-moleculs/ModalPopup");
var _Style = require("./Style");
var _ModalOptionsView = _interopRequireDefault(require("./ModalOptionsView"));
var _ModalPopupInputsView = _interopRequireDefault(require("./ModalPopupInputsView"));
const _crModalPopup = (0, _ModalPopup.fCrModalPopup)((className, style) => ({
  className,
  style: {
    ..._Style.S_MODAL_POPUP,
    ...style
  }
}));
const ModalOptions = exports.ModalOptions = _crModalPopup(_ModalOptionsView.default);
const ModalPopupInputs = exports.ModalPopupInputs = _crModalPopup(_ModalPopupInputsView.default);
//# sourceMappingURL=ModalPopups.js.map