"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _Svg = _interopRequireDefault(require("../zhn/svg/Svg100"));

var _crCn = _interopRequireDefault(require("../zhn-utils/crCn"));

var _StyleLogo = require("./StyleLogo");

var _jsxRuntime = require("react/jsx-runtime");

const CL_LOGO_REACT = 'logo-react',
      DF_ARIA_LABEL = 'React',
      HREF = 'https://reactjs.org';

const LogoReact = _ref => {
  let {
    ariaLabel = DF_ARIA_LABEL,
    className
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
    "aria-label": DF_ARIA_LABEL,
    className: (0, _crCn.default)(className, CL_LOGO_REACT),
    href: HREF,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Svg.default, { ..._StyleLogo.LOGO_SVG_PROPS,
      w: "600",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("circle", {
        cx: "299.529",
        cy: "299.628",
        r: "50.167"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
        fill: "none",
        d: "M299.529,197.628\r c67.356,0,129.928,9.665,177.107,25.907c56.844,19.569,91.794,49.233,91.794,76.093c0,27.991-37.041,59.503-98.083,79.728\r c-46.151,15.291-106.879,23.272-170.818,23.272c-65.554,0-127.63-7.492-174.29-23.441c-59.046-20.182-94.611-52.103-94.611-79.559\r c0-26.642,33.37-56.076,89.415-75.616C167.398,207.503,231.515,197.628,299.529,197.628z"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
        fill: "none",
        d: "M210.736,248.922\r c33.649-58.348,73.281-107.724,110.92-140.48c45.35-39.466,88.507-54.923,111.775-41.505\r c24.248,13.983,33.042,61.814,20.067,124.796c-9.81,47.618-33.234,104.212-65.176,159.601\r c-32.749,56.788-70.25,106.819-107.377,139.272c-46.981,41.068-92.4,55.929-116.185,42.213\r c-23.079-13.31-31.906-56.921-20.834-115.233C153.281,368.316,176.758,307.841,210.736,248.922z"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
        fill: "none",
        d: "M210.821,351.482\r c-33.746-58.292-56.731-117.287-66.312-166.255c-11.544-58.999-3.382-104.109,19.864-117.566\r c24.224-14.024,70.055,2.244,118.14,44.94c36.356,32.28,73.688,80.837,105.723,136.173c32.844,56.733,57.461,114.209,67.036,162.582\r c12.117,61.213,2.309,107.984-21.453,121.74c-23.057,13.348-65.249-0.784-110.239-39.499\r C285.567,460.886,244.898,410.344,210.821,351.482z"
      })]
    })
  });
};

var _default = LogoReact;
exports.default = _default;
//# sourceMappingURL=LogoReact.js.map