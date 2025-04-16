"use strict";

exports.__esModule = true;
exports.getMenuItemStyle = exports.S_TITLE_ARROW = exports.S_TITLE = exports.S_MSG_ERR = exports.S_FRAME = exports.CL_MENU_ITEM = void 0;
var _styleFn = require("../styleFn");
const CL_MENU_ITEM = exports.CL_MENU_ITEM = "menu-item";
const S_FRAME = exports.S_FRAME = {
  fontWeight: 'bold',
  fontSize: '16px'
};
const S_MSG_ERR = exports.S_MSG_ERR = {
  color: '#f44336',
  paddingLeft: 12
};
const S_TITLE = exports.S_TITLE = {
  position: 'relative',
  color: "#607d8b",
  padding: '8px 0 4px 32px',
  cursor: 'pointer'
};
const S_TITLE_ARROW = exports.S_TITLE_ARROW = (0, _styleFn.crAbsoluteTopLeftStyle)(8, 16);
const _CL_MENU_ITEM_BLACK = `${CL_MENU_ITEM} ${_styleFn.CL_BLACK}`,
  _S_ITEM_T = {
    padding: 8,
    cursor: 'pointer'
  },
  _S_ITEM_L = {
    ..._S_ITEM_T,
    paddingLeft: 12
  };
const getMenuItemStyle = type => type === 'l' ? [CL_MENU_ITEM, _S_ITEM_L] : [_CL_MENU_ITEM_BLACK, _S_ITEM_T];
exports.getMenuItemStyle = getMenuItemStyle;
//# sourceMappingURL=Style.js.map