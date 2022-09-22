"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _Svg = _interopRequireDefault(require("../zhn/svg/Svg100"));

var _crCn = _interopRequireDefault(require("../zhn-utils/crCn"));

var _StyleLogo = require("./StyleLogo");

var _jsxRuntime = require("react/jsx-runtime");

const CL_LOGO_GITHUB = 'logo-github',
      DF_ARIA_LABEL = 'GitHub Repository';

const LogoGitHub = _ref => {
  let {
    ariaLabel = DF_ARIA_LABEL,
    className,
    href
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
    "aria-label": ariaLabel,
    className: (0, _crCn.default)(className, CL_LOGO_GITHUB),
    href: href,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Svg.default, { ..._StyleLogo.LOGO_SVG_PROPS,
      w: "16",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
        d: "M8 0C3.58 0 0 3.582 0 8c0 3.535 2.292 6.533 5.47 7.59.4.075.547-.172.547-.385 0-.19-.007-.693-.01-1.36-2.226.483-2.695-1.073-2.695-1.073-.364-.924-.89-1.17-.89-1.17-.725-.496.056-.486.056-.486.803.056 1.225.824 1.225.824.714 1.223 1.873.87 2.33.665.072-.517.278-.87.507-1.07-1.777-.2-3.644-.888-3.644-3.953 0-.873.31-1.587.823-2.147-.083-.202-.358-1.015.077-2.117 0 0 .672-.215 2.2.82.638-.178 1.323-.266 2.003-.27.68.004 1.364.092 2.003.27 1.527-1.035 2.198-.82 2.198-.82.437 1.102.163 1.915.08 2.117.513.56.823 1.274.823 2.147 0 3.073-1.87 3.75-3.653 3.947.287.246.543.735.543 1.48 0 1.07-.01 1.933-.01 2.195 0 .215.144.463.55.385C13.71 14.53 16 11.534 16 8c0-4.418-3.582-8-8-8"
      })
    })
  });
};

var _default = LogoGitHub;
exports.default = _default;
//# sourceMappingURL=LogoGitHub.js.map