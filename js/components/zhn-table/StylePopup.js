"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _SvgCheckBox = _interopRequireDefault(require("../zhn/SvgCheckBox"));

var _ModalPopup = _interopRequireDefault(require("../zhn-moleculs/ModalPopup"));

var S = {
  STRIP: {
    paddingLeft: '8px',
    fontWeight: 'bold'
  }
};

var StylePopup = function StylePopup(_ref) {
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
  }, _react["default"].createElement(_SvgCheckBox["default"], {
    value: isGridLine,
    onCheck: onCheck,
    onUnCheck: onUnCheck
  }), _react["default"].createElement("span", {
    style: S.STRIP
  }, "withStripLines"));
};

var _default = StylePopup;
exports["default"] = _default;
//# sourceMappingURL=StylePopup.js.map