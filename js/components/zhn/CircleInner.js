"use strict";

exports.__esModule = true;
exports.default = void 0;

var _jsxRuntime = require("react/jsx-runtime");

const S_CIRCLE_INNER = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: 12,
  height: 12,
  overflow: 'visible'
},
      S_CIRCLE_INNER_EL = {
  position: 'absolute',
  top: -12,
  left: -12,
  width: '300%',
  height: 36,
  borderRadius: '50%',
  //opacity: '0.16',
  backgroundColor: 'rgba(0, 188, 212, 0.16)' //transform: 'scale(1)'

};

const CircleInner = _ref => {
  let {
    is,
    circleStyle,
    emberStyle
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: { ...S_CIRCLE_INNER,
      ...circleStyle
    },
    children: is ? /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: { ...S_CIRCLE_INNER_EL,
        ...emberStyle
      }
    }) : null
  });
};

var _default = CircleInner;
exports.default = _default;
//# sourceMappingURL=CircleInner.js.map