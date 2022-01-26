"use strict";

exports.__esModule = true;
exports.default = void 0;
const CL_ROW = 'row__pane-topic not-selected';

const _crItem = (name, onClick) => ({
  name,
  onClick,
  isClose: true
});

const crModel = (toggleToolbar, onToTop, hideCaption) => ({
  titleCl: CL_ROW,
  pageWidth: 150,
  maxPages: 1,
  p0: [_crItem('Move to Top', onToTop), _crItem('Hide Caption', hideCaption), _crItem('Toggle Toolbar', toggleToolbar)]
});

var _default = crModel;
exports.default = _default;
//# sourceMappingURL=ChartItemMore.js.map