"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _ModalPopup = _interopRequireDefault(require("../zhn-moleculs/ModalPopup"));

var _RowCheckBox = _interopRequireDefault(require("../dialogs/rows/RowCheckBox"));

var _Style = require("../dialogs/modals/Style");

var _jsxRuntime = require("react/jsx-runtime");

const S_MODAL = { ..._Style.S_MODAL_POPUP,
  lineHeight: 1.6,
  padding: '6px 14px'
};

const ModalInputToggle = _ref => {
  let {
    isShow,
    configs,
    onClose
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalPopup.default, {
    isShow: isShow,
    className: _Style.CL_POPUP_MENU,
    style: S_MODAL,
    onClose: onClose,
    children: (configs || []).map(config => /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowCheckBox.default, {
      style: _Style.S_ROW_CHB,
      checkedColor: _Style.TOGGLE_INPUT_CHECKBOX_COLOR,
      caption: config[0],
      value: config[1],
      onToggle: config[2]
    }, config[0]))
  });
};

var _default = ModalInputToggle;
exports.default = _default;
//# sourceMappingURL=ModalInputToggle.js.map