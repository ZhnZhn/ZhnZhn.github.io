"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _ShowHide = _interopRequireDefault(require("../zhn/ShowHide"));

var _ToolbarButtonCircle = _interopRequireDefault(require("./ToolbarButtonCircle"));

var Toolbar = function Toolbar(_ref) {
  var isShow = _ref.isShow,
      buttons = _ref.buttons;
  return _react["default"].createElement(_ShowHide["default"], {
    isShow: isShow
  }, _react["default"].createElement(_ToolbarButtonCircle["default"], {
    buttons: buttons
  }));
};

var _default = Toolbar;
exports["default"] = _default;
//# sourceMappingURL=Toolbar.js.map