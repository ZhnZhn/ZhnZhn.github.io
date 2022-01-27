"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _A = _interopRequireDefault(require("../zhn/A"));

var _jsxRuntime = require("react/jsx-runtime");

const S_ROW = {
  paddingTop: 5
},
      crSpanStyle = color => ({
  color,
  paddingLeft: 8
});

const SeriaConfigs = _ref => {
  let {
    configs,
    onRemove
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    children: configs.map(_ref2 => {
      let {
        id,
        color
      } = _ref2;
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: S_ROW,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_A.default.SvgMinus, {
          onClick: onRemove.bind(null, id)
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          style: crSpanStyle(color),
          children: id
        })]
      }, id);
    })
  });
};

var _default = SeriaConfigs;
exports.default = _default;
//# sourceMappingURL=SeriaConfigs.js.map