"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _ModalPopup = _interopRequireDefault(require("../zhn-moleculs/ModalPopup"));

var _SubMenuItem = _interopRequireDefault(require("./SubMenuItem"));

var _ModalMenu = _interopRequireDefault(require("./ModalMenu.Style"));

var _renderItems = function _renderItems(configs, onClickItem) {
  return configs.map(function (c) {
    var btTitle = c.btTitle;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_SubMenuItem["default"], {
      caption: btTitle,
      onClick: onClickItem.bind(null, btTitle)
    }, btTitle);
  });
};

var ModalMenuMini = function ModalMenuMini(_ref) {
  var isShow = _ref.isShow,
      style = _ref.style,
      onClose = _ref.onClose,
      configs = _ref.configs,
      onClickItem = _ref.onClickItem;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalPopup["default"], {
    isShow: isShow,
    style: (0, _extends2["default"])({}, _ModalMenu["default"].ROOT, style),
    onClose: onClose,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: _ModalMenu["default"].PANE,
      children: configs && _renderItems(configs, onClickItem)
    })
  });
};

var _default = ModalMenuMini;
exports["default"] = _default;
//# sourceMappingURL=ModalMenuMini.js.map