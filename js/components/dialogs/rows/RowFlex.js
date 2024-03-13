"use strict";

exports.__esModule = true;
exports.S_ROW_FLEX = exports.RowFlexEnd = exports.RowFlex = void 0;
var _styleFn = require("../../styleFn");
var _jsxRuntime = require("react/jsx-runtime");
const S_ROW_FLEX = exports.S_ROW_FLEX = {
  display: 'flex',
  alignItems: 'center',
  margin: 5
};
const RowFlex = _ref => {
  let {
    style,
    children
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: (0, _styleFn.crStyle2)(S_ROW_FLEX, style),
    children: children
  });
};
exports.RowFlex = RowFlex;
const S_ROW_FLEX_END = {
  display: 'flex',
  justifyContent: 'flex-end',
  flexWrap: 'wrap',
  margin: '8px 4px 10px 0'
};
const RowFlexEnd = _ref2 => {
  let {
    style,
    children
  } = _ref2;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: (0, _styleFn.crStyle2)(S_ROW_FLEX_END, style),
    children: children
  });
};
exports.RowFlexEnd = RowFlexEnd;
//# sourceMappingURL=RowFlex.js.map