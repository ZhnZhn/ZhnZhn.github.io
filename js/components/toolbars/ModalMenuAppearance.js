"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _styleFn = require("../styleFn");
var _ModalPopup = _interopRequireDefault(require("../zhn-moleculs/ModalPopup"));
var _RowCheckBox = _interopRequireDefault(require("../dialogs/rows/RowCheckBox1"));
var _ModalMenu = require("./ModalMenu.Style");
var _jsxRuntime = require("react/jsx-runtime");
const S_CHB = {
  padding: 0
};
const ModalMenuAppearance = _ref => {
  let {
    style,
    isShow,
    onClose,
    getChart,
    config
  } = _ref;
  /*eslint-disable react-hooks/exhaustive-deps */
  const [_enableCategoryLabels, _disableCategoryLabels] = (0, _uiApi.useMemo)(() => [() => {
    getChart().zhDataLabels(true);
  }, () => {
    getChart().zhDataLabels(false);
  }], []);
  // getChart
  /*eslint-enable react-hooks/exhaustive-deps */

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalPopup.default, {
    style: {
      ..._ModalMenu.S_MODAL_MENU,
      ...style
    },
    isShow: isShow,
    onClose: onClose,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: _ModalMenu.S_MENU_PANE,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowCheckBox.default, {
        style: S_CHB,
        caption: "Data Labels",
        chbCn: _styleFn.CL_CHB_BLACK,
        btCn: _styleFn.CL_BLACK,
        onCheck: _enableCategoryLabels,
        onUnCheck: _disableCategoryLabels
      })
    })
  });
};
var _default = exports.default = ModalMenuAppearance;
//# sourceMappingURL=ModalMenuAppearance.js.map