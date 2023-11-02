"use strict";

exports.__esModule = true;
exports.crSvgMoreStyle = exports.crNaNStyle = exports.TOKEN_NAN = exports.S_WRAPPER_DIV = exports.S_UP = exports.S_TH_UP = exports.S_TH_MORE_SPAN = exports.S_TH_DOWN = exports.S_THEAD = exports.S_TH = exports.S_TD = exports.S_TABLE = exports.S_MENU_MORE = exports.S_DOWN = exports.S_BT_SVG_MORE = exports.CL_LINK = exports.CL_GRID = exports.CL_BLACK = void 0;
var _styleFn = require("../styleFn");
exports.CL_BLACK = _styleFn.CL_BLACK;
exports.getColorBlack = _styleFn.getColorBlack;
const TOKEN_NAN = exports.TOKEN_NAN = '―';
const CL_LINK = exports.CL_LINK = "native-link";
const CL_GRID = exports.CL_GRID = "grid";
const S_WRAPPER_DIV = exports.S_WRAPPER_DIV = {
  position: 'relative'
};
const S_TABLE = exports.S_TABLE = {
  width: '100%',
  borderCollapse: 'collapse',
  borderSpacing: 0
};
const S_THEAD = exports.S_THEAD = {
  lineHeight: 1.8
};
const S_TH = exports.S_TH = {
  //position: 'sticky',
  //top: 32,
  //zIndex: 2,
  borderTop: '3px solid transparent',
  borderBottom: '3px solid transparent',
  pointerEvents: 'auto',
  userSelect: 'none',
  cursor: 'pointer'
};
const S_TH_MORE_SPAN = exports.S_TH_MORE_SPAN = {
  position: 'relative',
  top: -2
};
const S_TH_UP = exports.S_TH_UP = {
  borderTop: '3px solid #f1d600'
};
const S_TH_DOWN = exports.S_TH_DOWN = {
  borderBottom: '3px solid #f1d600'
};
const S_BT_SVG_MORE = exports.S_BT_SVG_MORE = {
  position: 'relative',
  top: 2,
  marginRight: 4
};
const crSvgMoreStyle = () => ({
  fill: (0, _styleFn.getColorBlack)(),
  stroke: (0, _styleFn.getColorBlack)()
});
exports.crSvgMoreStyle = crSvgMoreStyle;
const crNaNStyle = () => ({
  color: (0, _styleFn.getColorBlack)(),
  fontWeight: 'bold'
});
exports.crNaNStyle = crNaNStyle;
const S_MENU_MORE = exports.S_MENU_MORE = {
  position: 'absolute',
  top: 36,
  left: 0,
  zIndex: 1010,
  backgroundColor: 'inherit',
  padding: '4px 12px 6px',
  borderRadius: 5,
  boxShadow: 'rgba(0, 0, 0, 0.2) 0 0 0 5px'
};
const S_TD = exports.S_TD = {
  padding: 6,
  verticalAlign: 'middle',
  lineHeight: 1.4,
  whiteSpace: 'nowrap',
  borderTop: 0
};
const S_UP = exports.S_UP = {
  color: '#4caf50',
  fontWeight: 'bold'
};
const S_DOWN = exports.S_DOWN = {
  color: '#f44336',
  fontWeight: 'bold'
};
//# sourceMappingURL=Style.js.map