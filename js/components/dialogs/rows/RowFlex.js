"use strict";

exports.__esModule = true;
exports.S_ROW_FLEX = exports.RowFlexEnd = exports.RowFlex = void 0;
var _styleFn = require("../../styleFn");
var _jsxRuntime = require("react/jsx-runtime");
const _fRowFlex = initialStyle => _ref => {
  let {
    style,
    children
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: (0, _styleFn.crStyle2)(initialStyle, style),
    children: children
  });
};
const S_ROW_FLEX = exports.S_ROW_FLEX = {
  ..._styleFn.S_FLEX,
  alignItems: 'center',
  margin: '5px 8px'
};
const RowFlex = exports.RowFlex = _fRowFlex(S_ROW_FLEX);
const S_ROW_FLEX_END = {
  ..._styleFn.S_FLEX,
  justifyContent: 'flex-end',
  flexWrap: 'wrap',
  padding: '6px 4px 6px 0'
};
const RowFlexEnd = exports.RowFlexEnd = _fRowFlex(S_ROW_FLEX_END);
//# sourceMappingURL=RowFlex.js.map