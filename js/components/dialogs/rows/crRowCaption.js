"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _DialogStyles = _interopRequireDefault(require("../../styles/DialogStyles"));

var crRowCaption = function crRowCaption(caption) {
  if (caption === void 0) {
    caption = '';
  }

  return {
    caption: _DialogStyles["default"].crRowCaption(caption)
  };
};

var _default = crRowCaption;
exports["default"] = _default;
//# sourceMappingURL=crRowCaption.js.map