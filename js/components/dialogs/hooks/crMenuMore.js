"use strict";

exports.__esModule = true;
exports.default = void 0;
const CL_ROW = 'row__pane-topic not-selected';

const _crItem = (name, onClick) => ({
  name,
  onClick,
  cn: CL_ROW,
  isClose: true
});

const crMenuMore = (onToggleToolbar, onAbout) => ({
  titleCl: CL_ROW,
  pageWidth: 175,
  maxPages: 1,
  p0: [_crItem('Toggle Toolbar', onToggleToolbar), _crItem('About Datasouce', onAbout)]
});

var _default = crMenuMore;
exports.default = _default;
//# sourceMappingURL=crMenuMore.js.map