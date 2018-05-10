'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var CL_ROW = 'row__pane-topic not-selected';

var crModel = function crModel(comp, _ref) {
  var onToggle = _ref.onToggle,
      onToTop = _ref.onToTop;

  return {
    baseTitleCl: CL_ROW,
    pageWidth: 150,
    maxPages: 1,
    p0: [{
      //id: 'p1',
      //type: 'sub',
      cn: CL_ROW,
      name: 'Move to Top',
      onClick: onToTop,
      isClose: true
    }, {
      cn: CL_ROW,
      name: 'Toggle Toolbar',
      onClick: onToggle.bind(comp),
      isClose: true
    }]
  };
};

exports.default = crModel;
//# sourceMappingURL=AreaMore.js.map