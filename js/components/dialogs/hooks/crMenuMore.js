"use strict";

exports.__esModule = true;
exports.default = void 0;
var _styleFn = require("../../styleFn");
const _crItem = (name, onClick) => ({
  name,
  onClick,
  cn: _styleFn.CL_ROW_PANE_TOPIC,
  isClose: true
});
const crMenuMore = (onToggleToolbar, onAbout) => ({
  titleCl: _styleFn.CL_ROW_PANE_TOPIC,
  pageWidth: 185,
  maxPages: 1,
  p0: [_crItem('Toggle Toolbar', onToggleToolbar), _crItem('About Data Source', onAbout)]
});
var _default = exports.default = crMenuMore;
//# sourceMappingURL=crMenuMore.js.map