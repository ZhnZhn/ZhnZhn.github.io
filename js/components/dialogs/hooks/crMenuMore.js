"use strict";

exports.__esModule = true;
exports.default = void 0;
var _styleFn = require("../../styleFn");
var _menuModelFn = require("../../menuModelFn");
const _crItem = (name, onClick) => (0, _menuModelFn.crItem)(name, onClick, true, _styleFn.CL_ROW_PANE_TOPIC);
const crMenuMore = (onToggleToolbar, onAbout) => (0, _menuModelFn.crSliderMenu)(_styleFn.CL_ROW_PANE_TOPIC, 185, 1, {
  p0: [_crItem('Toggle Toolbar', onToggleToolbar), _crItem('About Data Source', onAbout)]
});
var _default = exports.default = crMenuMore;
//# sourceMappingURL=crMenuMore.js.map