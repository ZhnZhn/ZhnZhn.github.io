"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

const CL_ROW = 'row__pane-topic not-selected';

const _crMenuItem = (name, onClick, isClose = true) => ({
  cn: CL_ROW,
  onClick,
  name,
  isClose
});

const useMenuMore = (toggleToolBar, onAbout) =>
/*eslint-disable react-hooks/exhaustive-deps */
(0, _react.useMemo)(() => ({
  titleCl: CL_ROW,
  pageWidth: 175,
  maxPages: 1,
  p0: [_crMenuItem('Toggle ToolBar', toggleToolBar), _crMenuItem('About Datasource', onAbout)]
}), []); //toggleToolBar, onAbout

/*eslint-enable react-hooks/exhaustive-deps */


var _default = useMenuMore;
exports.default = _default;
//# sourceMappingURL=useMenuMore.js.map