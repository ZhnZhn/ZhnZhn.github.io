"use strict";

exports.__esModule = true;
exports.S_SVG = exports.S_NONE = exports.S_CAPTION = exports.S_BLOCK = exports.PATH_OPEN = exports.PATH_CLOSE = exports.FILL_CLOSE_COLOR = exports.CL_SHOW_POPUP = exports.CL_OPEN_CLOSE_EXP = exports.CL_OPEN_CLOSE = exports.CL_NOT_SELECTED = void 0;
var _styleFn = require("../styleFn");
exports.CL_SHOW_POPUP = _styleFn.CL_SHOW_POPUP;
exports.CL_NOT_SELECTED = _styleFn.CL_NOT_SELECTED;
exports.S_BLOCK = _styleFn.S_BLOCK;
exports.S_NONE = _styleFn.S_NONE;
var _Color = require("../styles/Color");
const CL_OPEN_CLOSE = exports.CL_OPEN_CLOSE = 'zhn-oc';
const CL_OPEN_CLOSE_EXP = exports.CL_OPEN_CLOSE_EXP = `${CL_OPEN_CLOSE}__exp`;
const S_SVG = exports.S_SVG = {
  display: 'inline-block',
  position: 'relative',
  top: 1,
  marginLeft: 8
};
const S_CAPTION = exports.S_CAPTION = {
  paddingLeft: 4,
  fontWeight: 'bold',
  fontSize: '16px',
  cursor: 'pointer'
};
const FILL_CLOSE_COLOR = exports.FILL_CLOSE_COLOR = _Color.TRANSPARENT_COLOR;
const PATH_OPEN = exports.PATH_OPEN = "M 2,14 L 14,14 14,2 2,14";
const PATH_CLOSE = exports.PATH_CLOSE = "M 2,2 L 14,8 2,14 2,2";
//# sourceMappingURL=OpenCloseStyle.js.map