"use strict";

exports.__esModule = true;
exports.default = void 0;
var _BtSvgCircle = require("../zhn/BtSvgCircle");
var _jsxRuntime = require("react/jsx-runtime");
const S_ROW = {
    paddingTop: 5
  },
  _crSpanStyle = color => ({
    color,
    paddingLeft: 8
  });
const SeriaConfigs = _ref => {
  let {
    configs,
    onRemove
  } = _ref;
  return configs.map(_ref2 => {
    let {
      id,
      color
    } = _ref2;
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: S_ROW,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_BtSvgCircle.SvgMinus, {
        onClick: () => onRemove(id)
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        style: _crSpanStyle(color),
        children: id
      })]
    }, id);
  });
};
var _default = exports.default = SeriaConfigs;
//# sourceMappingURL=SeriaConfigs.js.map