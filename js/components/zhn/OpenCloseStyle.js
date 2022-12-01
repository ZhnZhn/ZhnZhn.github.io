"use strict";

exports.__esModule = true;
exports.S_SVG = exports.S_NONE = exports.S_CAPTION = exports.S_BLOCK = exports.PATH_OPEN = exports.PATH_CLOSE = exports.FILL_CLOSE_COLOR = exports.CL_SHOW_POPUP = exports.CL_OPEN_CLOSE_EXP = exports.CL_OPEN_CLOSE = exports.CL_NOT_SELECTED = void 0;

var _Color = require("../styles/Color");

const CL_OPEN_CLOSE = 'zhn-oc';
exports.CL_OPEN_CLOSE = CL_OPEN_CLOSE;
const CL_OPEN_CLOSE_EXP = CL_OPEN_CLOSE + "__exp";
exports.CL_OPEN_CLOSE_EXP = CL_OPEN_CLOSE_EXP;
const CL_SHOW_POPUP = 'show-popup';
exports.CL_SHOW_POPUP = CL_SHOW_POPUP;
const CL_NOT_SELECTED = 'not-selected';
exports.CL_NOT_SELECTED = CL_NOT_SELECTED;
const S_SVG = {
  display: 'inline-block',
  position: 'relative',
  top: 1,
  marginLeft: 8
};
exports.S_SVG = S_SVG;
const S_CAPTION = {
  paddingLeft: 4,
  fontWeight: 'bold',
  fontSize: '16px',
  cursor: 'pointer'
};
exports.S_CAPTION = S_CAPTION;
const S_BLOCK = {
  display: 'block'
};
exports.S_BLOCK = S_BLOCK;
const S_NONE = {
  display: 'none'
};
exports.S_NONE = S_NONE;
const FILL_CLOSE_COLOR = _Color.TRANSPARENT_COLOR;
exports.FILL_CLOSE_COLOR = FILL_CLOSE_COLOR;
const PATH_OPEN = "M 2,14 L 14,14 14,2 2,14";
exports.PATH_OPEN = PATH_OPEN;
const PATH_CLOSE = "M 2,2 L 14,8 2,14 2,2";
exports.PATH_CLOSE = PATH_CLOSE;
//# sourceMappingURL=OpenCloseStyle.js.map