"use strict";

exports.__esModule = true;
exports.S_SVG_CLOSE = exports.S_ROOT_DIV = exports.S_COMMAND_DIV = exports.S_CAPTION_DIV = exports.S_BT_LOAD = exports.S_BT = void 0;
var _GeneralStyles = require("../styles/GeneralStyles");
const S_ROOT_DIV = {
  borderRadius: 5,
  boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px 6px'
};
exports.S_ROOT_DIV = S_ROOT_DIV;
const S_CAPTION_DIV = {
  position: 'relative',
  padding: '5px 35px 5px 16px',
  textAlign: 'center',
  fontSize: '18px',
  fontWeight: 500
};
exports.S_CAPTION_DIV = S_CAPTION_DIV;
const S_COMMAND_DIV = {
  ..._GeneralStyles.S_FLEX_ROW_END,
  margin: '8px 4px 10px 0'
};
exports.S_COMMAND_DIV = S_COMMAND_DIV;
const S_BT = {
  color: '#1b2836'
};
exports.S_BT = S_BT;
const S_BT_LOAD = {
  color: '#607d8b'
};
exports.S_BT_LOAD = S_BT_LOAD;
const S_SVG_CLOSE = {
  position: 'absolute',
  top: 4,
  right: 0,
  marginRight: 6
};
exports.S_SVG_CLOSE = S_SVG_CLOSE;
//# sourceMappingURL=Dialog.Style.js.map