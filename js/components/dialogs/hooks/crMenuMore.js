"use strict";

exports.__esModule = true;
exports.default = void 0;
var _styleFn = require("../../styleFn");
var _menuModelFn = require("../../menuModelFn");
const crMenuMore = (onToggleToolbar, onAbout) => (0, _menuModelFn.crSliderMenu)(_styleFn.CL_ROW_PANE_TOPIC, 185, 1, {
  p0: [(0, _menuModelFn.addToggleTo)((0, _menuModelFn.crItem)('Toolbar', onToggleToolbar, !1), !0), (0, _menuModelFn.crItem)('About Data Source', onAbout)]
});
var _default = exports.default = crMenuMore;
//# sourceMappingURL=crMenuMore.js.map