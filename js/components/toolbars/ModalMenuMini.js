"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _ModalPopup = _interopRequireDefault(require("../zhn-moleculs/ModalPopup"));

var _SubMenuItem = _interopRequireDefault(require("./SubMenuItem"));

var _ModalMenu = require("./ModalMenu.Style");

var _jsxRuntime = require("react/jsx-runtime");

const _renderItems = (configs, onClickItem) => (configs || []).map(_ref => {
  let {
    btTitle
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_SubMenuItem.default, {
    caption: btTitle,
    onClick: onClickItem.bind(null, btTitle)
  }, btTitle);
});

const ModalMenuMini = _ref2 => {
  let {
    isShow,
    style,
    onClose,
    configs,
    onClickItem
  } = _ref2;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalPopup.default, {
    isShow: isShow,
    style: { ..._ModalMenu.S_MODAL_MENU,
      ...style
    },
    onClose: onClose,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: _ModalMenu.S_MODAL_MENU_PANE,
      children: _renderItems(configs, onClickItem)
    })
  });
};

var _default = ModalMenuMini;
exports.default = _default;
//# sourceMappingURL=ModalMenuMini.js.map