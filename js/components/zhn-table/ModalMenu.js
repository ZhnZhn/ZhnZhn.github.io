"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _ModalPopup = _interopRequireDefault(require("../zhn-moleculs/ModalPopup"));

var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));

var S = {
  ROW: {
    paddingLeft: 0,
    paddingBottom: 4
  }
};

var ModalMenu = function ModalMenu(_ref) {
  var isShow = _ref.isShow,
      style = _ref.style,
      onClose = _ref.onClose,
      isGridLine = _ref.isGridLine,
      onCheck = _ref.onCheck,
      onUnCheck = _ref.onUnCheck;
  return _react["default"].createElement(_ModalPopup["default"], {
    style: style,
    isShow: isShow,
    onClose: onClose
  }, _react["default"].createElement(_DialogCell["default"].RowCheckBox, {
    rootStyle: S.ROW,
    checkedColor: "black",
    caption: "withStripLines",
    value: isGridLine,
    onCheck: onCheck,
    onUnCheck: onUnCheck
  }));
};

var _default = ModalMenu;
exports["default"] = _default;
//# sourceMappingURL=ModalMenu.js.map