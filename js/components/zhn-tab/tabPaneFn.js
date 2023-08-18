"use strict";

exports.__esModule = true;
exports.crTabPanelId = exports.crTabId = exports.crTabCn = exports.CL_TAB_SELECTED = exports.CL_TAB = void 0;
var _styleFn = require("../styleFn");
const CL_TAB = 'tab',
  CL_TAB_SELECTED = CL_TAB + "--selected",
  crTabCn = isSelected => (0, _styleFn.crCn)(CL_TAB, [isSelected, CL_TAB_SELECTED]),
  crTabId = (tabPaneId, index) => "tab-" + tabPaneId + "-" + index,
  crTabPanelId = (tabPaneId, index) => "tabpanel-" + tabPaneId + "-" + index;
exports.crTabPanelId = crTabPanelId;
exports.crTabId = crTabId;
exports.crTabCn = crTabCn;
exports.CL_TAB_SELECTED = CL_TAB_SELECTED;
exports.CL_TAB = CL_TAB;
//# sourceMappingURL=tabPaneFn.js.map