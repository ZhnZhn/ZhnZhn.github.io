"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var CL_ROW = 'row__pane-topic not-selected';

var _crItem = function _crItem(name, onClick) {
  return {
    name: name,
    onClick: onClick,
    isClose: true
  };
};

var crModel = function crModel(comp, _ref) {
  var onToggle = _ref.onToggle,
      onToTop = _ref.onToTop,
      onHideCaption = _ref.onHideCaption;
  return {
    baseTitleCl: CL_ROW,
    pageWidth: 150,
    maxPages: 1,
    p0: [_crItem('Move to Top', onToTop), _crItem('Hide Caption', onHideCaption.bind(comp)), _crItem('Toggle Toolbar', onToggle.bind(comp))]
  };
};

var _default = crModel;
exports["default"] = _default;
//# sourceMappingURL=ChartItemMore.js.map