"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var CL_ROW = 'row__pane-topic not-selected';

var crModel = function crModel(comp, _ref) {
  var onToggle = _ref.onToggle,
      onToTop = _ref.onToTop,
      onHideCaption = _ref.onHideCaption;
  return {
    baseTitleCl: CL_ROW,
    pageWidth: 150,
    maxPages: 1,
    p0: [{
      name: 'Move to Top',
      onClick: onToTop,
      isClose: true
    }, {
      name: 'Toggle Toolbar',
      onClick: onToggle.bind(comp),
      isClose: true
    }, {
      name: 'Hide Caption',
      onClick: onHideCaption.bind(comp),
      isClose: true
    }]
  };
};

var _default = crModel;
exports["default"] = _default;
//# sourceMappingURL=AreaMore.js.map