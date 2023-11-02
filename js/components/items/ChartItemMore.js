"use strict";

exports.__esModule = true;
exports.default = void 0;
var _styleFn = require("../styleFn");
const _crItem = (name, onClick) => ({
  name,
  onClick,
  isClose: true
});
const crModel = (toggleToolbar, onToTop, hideCaption) => ({
  titleCl: _styleFn.CL_ROW_PANE_TOPIC,
  pageWidth: 150,
  maxPages: 1,
  p0: [_crItem('Move to Top', onToTop), _crItem('Hide Caption', hideCaption), _crItem('Toggle Toolbar', toggleToolbar)]
});
var _default = exports.default = crModel;
//# sourceMappingURL=ChartItemMore.js.map