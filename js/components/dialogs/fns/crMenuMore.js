"use strict";

exports.__esModule = true;
exports.default = void 0;
var _styleFn = require("../../styleFn");
const _addItemTo = (arr, comp, _ref) => {
  let {
    name,
    onClick,
    isClose
  } = _ref;
  if (onClick) {
    arr.push({
      cn: _styleFn.CL_ROW_PANE_TOPIC,
      onClick: onClick.bind(comp),
      name,
      isClose
    });
  }
};
const crMenuMore = (comp, _ref2) => {
  let {
    toggleToolBar,
    onAbout
  } = _ref2;
  const p0 = [];
  _addItemTo(p0, comp, {
    name: 'Toggle ToolBar',
    onClick: toggleToolBar,
    isClose: true
  });
  _addItemTo(p0, comp, {
    name: 'About Datasource',
    onClick: onAbout,
    isClose: true
  });
  return {
    titleCl: _styleFn.CL_ROW_PANE_TOPIC,
    pageWidth: 175,
    maxPages: 1,
    p0: p0
  };
};
var _default = exports.default = crMenuMore;
//# sourceMappingURL=crMenuMore.js.map