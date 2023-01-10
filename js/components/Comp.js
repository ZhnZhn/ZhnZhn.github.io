"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _A = _interopRequireDefault(require("./zhn/A"));
var _A2 = _interopRequireDefault(require("./zhn-moleculs/A"));
var _ModalSlider = _interopRequireDefault(require("./zhn-modal-slider/ModalSlider"));
var _SvgHrzResize = _interopRequireDefault(require("./zhn-resize/SvgHrzResize"));
var _Tab = _interopRequireDefault(require("./zhn-tab/Tab"));
var _TabPane = _interopRequireDefault(require("./zhn-tab/TabPane"));
const Comp = {
  ..._A.default,
  ..._A2.default,
  ModalSlider: _ModalSlider.default,
  SvgHrzResize: _SvgHrzResize.default,
  Tab: _Tab.default,
  TabPane: _TabPane.default
};
var _default = Comp;
exports.default = _default;
//# sourceMappingURL=Comp.js.map