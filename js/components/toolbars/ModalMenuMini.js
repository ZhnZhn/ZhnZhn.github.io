"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _ModalPopup = _interopRequireDefault(require("../zhn-moleculs/ModalPopup"));

var _SubMenuItem = _interopRequireDefault(require("./SubMenuItem"));

var _ModalMenu = _interopRequireDefault(require("./ModalMenu.Style"));

var _renderItems = function _renderItems(configs, onClickItem) {
  return configs.map(function (c) {
    var btTitle = c.btTitle;
    return /*#__PURE__*/_react["default"].createElement(_SubMenuItem["default"], {
      key: btTitle,
      caption: btTitle,
      onClick: onClickItem.bind(null, btTitle)
    });
  });
};

var ModalMenuMini = function ModalMenuMini(_ref) {
  var isShow = _ref.isShow,
      style = _ref.style,
      onClose = _ref.onClose,
      configs = _ref.configs,
      onClickItem = _ref.onClickItem;
  return /*#__PURE__*/_react["default"].createElement(_ModalPopup["default"], {
    isShow: isShow,
    style: (0, _extends2["default"])({}, _ModalMenu["default"].ROOT, style),
    onClose: onClose
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: _ModalMenu["default"].PANE
  }, configs && _renderItems(configs, onClickItem)));
};

var _default = ModalMenuMini;
exports["default"] = _default;
//# sourceMappingURL=ModalMenuMini.js.map