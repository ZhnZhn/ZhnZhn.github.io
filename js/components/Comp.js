"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _A = _interopRequireDefault(require("./zhn/A"));

var _A2 = _interopRequireDefault(require("./zhn-m/A"));

var _ModalSlider = _interopRequireDefault(require("./zhn-modal-slider/ModalSlider"));

var Comp = (0, _extends2["default"])({}, _A["default"], {}, _A2["default"], {
  ModalSlider: _ModalSlider["default"]
});
var _default = Comp;
exports["default"] = _default;
//# sourceMappingURL=Comp.js.map