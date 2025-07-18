"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _styleFn = require("../styleFn");
var _menuModelFn = require("../menuModelFn");
var _ModalSlider = require("../zhn-modal-slider/ModalSlider");
var _ModalMenu = require("./ModalMenu.Style");
var _jsxRuntime = require("react/jsx-runtime");
const _crModel = (configs, onClickItem) => (0, _menuModelFn.crSliderMenu)(_styleFn.CL_ROW_PANE_TOPIC, 185, 1, {
  p0: (configs || []).map(_ref => {
    let {
      btTitle
    } = _ref;
    return (0, _menuModelFn.addToggleTo)((0, _menuModelFn.crItem)(btTitle, (0, _uiApi.bindTo)(onClickItem, btTitle), !1));
  })
});
const ModalMenuMini = _ref2 => {
  let {
    isShow,
    style,
    onClose,
    configs,
    onClickItem
  } = _ref2;
  const _model = (0, _uiApi.useMemo)(() => _crModel(configs, onClickItem), [configs, onClickItem]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalSlider.ModalSliderMemoIsShow, {
    isShow: isShow,
    style: {
      ..._ModalMenu.S_MODAL_MENU,
      ...style
    },
    model: _model,
    onClose: onClose
  });
};
var _default = exports.default = ModalMenuMini;
//# sourceMappingURL=ModalMenuMini.js.map