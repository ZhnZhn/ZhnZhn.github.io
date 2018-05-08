'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var CL_ROW = 'row__pane-topic not-selected';

var _addItemTo = function _addItemTo(arr, comp, _ref) {
  var name = _ref.name,
      onClick = _ref.onClick,
      isClose = _ref.isClose;

  if (onClick) {
    arr.push({
      cn: CL_ROW,
      onClick: onClick.bind(comp),
      name: name, isClose: isClose
    });
  }
};

var crMenuMore = function crMenuMore(comp, _ref2) {
  var toggleToolBar = _ref2.toggleToolBar,
      onAbout = _ref2.onAbout;

  var p0 = [];
  _addItemTo(p0, comp, {
    name: 'Toggle ToolBar',
    onClick: toggleToolBar,
    isClose: true
  });
  _addItemTo(p0, comp, {
    name: 'About',
    onClick: onAbout,
    isClose: true
  });

  return {
    baseTitleCl: CL_ROW,
    pageWidth: 160,
    maxPages: 1,
    p0: p0
  };
};

exports.default = crMenuMore;
//# sourceMappingURL=MenuMore.js.map