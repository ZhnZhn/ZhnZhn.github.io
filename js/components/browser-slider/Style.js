"use strict";

exports.__esModule = true;
exports.crItemTStyle = exports.S_TITLE_ARROW = exports.S_TITLE = exports.S_MSG_ERR = exports.S_ITEM_L = exports.S_FRAME = exports.CL_MENU_ITEM = void 0;
var _styleFn = require("../styleFn");
const CL_MENU_ITEM = exports.CL_MENU_ITEM = 'menu-item';
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
  color: 'silver',
  padding: '8px 0 4px 32px',
  cursor: 'pointer'
};
const S_TITLE_ARROW = exports.S_TITLE_ARROW = {
  position: 'absolute',
  top: 8,
  left: 16
};
const _S_ITEM = {
  padding: 8,
  cursor: 'pointer'
};
const S_ITEM_L = exports.S_ITEM_L = {
  ..._S_ITEM,
  paddingLeft: 12
};
const crItemTStyle = () => ({
  ..._S_ITEM,
  color: (0, _styleFn.getColorBlack)()
});
exports.crItemTStyle = crItemTStyle;
//# sourceMappingURL=Style.js.map