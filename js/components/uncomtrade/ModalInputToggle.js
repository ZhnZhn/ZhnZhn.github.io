"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _ModalPopup = _interopRequireDefault(require("../zhn-moleculs/ModalPopup"));
var _RowCheckBox = _interopRequireDefault(require("../dialogs/rows/RowCheckBox3"));
var _Style = require("../dialogs/modals/Style");
var _jsxRuntime = require("react/jsx-runtime");
const ModalInputToggle = _ref => {
  let {
    isShow,
    configs,
    onClose
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalPopup.default, {
    isShow: isShow,
    className: _Style.CL_POPUP_MENU,
    style: _Style.S_MODAL_POPUP,
    onClose: onClose,
    children: (configs || []).map(config => /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowCheckBox.default, {
      style: _Style.S_ROW,
      color: _Style.TOGGLE_INPUT_CHECKBOX_COLOR,
      caption: config[0],
      value: config[1],
      onToggle: config[2]
    }, config[0]))
  });
};
var _default = ModalInputToggle;
exports.default = _default;
//# sourceMappingURL=ModalInputToggle.js.map