"use strict";

exports.__esModule = true;
exports.default = void 0;
var _styleFn = require("../styleFn");
var _menuModelFn = require("../menuModelFn");
const crModel = (toggleToolbar, onToTop, hideCaption) => (0, _menuModelFn.crSliderMenu)(_styleFn.CL_ROW_PANE_TOPIC, 150, 1, {
  p0: [(0, _menuModelFn.crItem)('Move to Top', onToTop), (0, _menuModelFn.crItem)('Hide Caption', hideCaption), (0, _menuModelFn.crItem)('Toggle Toolbar', toggleToolbar)]
});
var _default = exports.default = crModel;
//# sourceMappingURL=ChartItemMore.js.map