"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _ModalPopup = _interopRequireDefault(require("../../zhn-moleculs/ModalPopup"));
var _RowCheckBox = _interopRequireDefault(require("../rows/RowCheckBox2"));
var _Style = require("./Style");
var _jsxRuntime = require("react/jsx-runtime");
const ROW_CHECKBOX_CONFIGS = [["isNotZoomToMinMax", "Not Zoom to Min-Max"], ["isFilterZero", "Filter Trim Zero Values"], ["isLogarithmic", "Logarithmic Scale"]];
const ModalOptions = _ref => {
  let {
    isShow,
    style,
    className = _Style.CL_POPUP_MENU,
    toggleOption,
    onClose
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalPopup.default, {
    isShow: isShow,
    style: {
      ..._Style.S_MODAL_POPUP,
      ...style
    },
    className: className,
    onClose: onClose,
    children: ROW_CHECKBOX_CONFIGS.map(_ref2 => {
      let [id, caption] = _ref2;
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowCheckBox.default, {
        style: _Style.S_ROW_CHB,
        caption: caption,
        onToggle: toggleOption,
        id: id
      }, id);
    })
  });
};
var _default = ModalOptions;
exports.default = _default;
//# sourceMappingURL=ModalOptions.js.map