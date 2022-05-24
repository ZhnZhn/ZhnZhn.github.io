"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.crInfo = exports.crClusterInfo = void 0;

var _ClusterInfo = _interopRequireDefault(require("../map/ClusterInfo"));

var _jsxRuntime = require("react/jsx-runtime");

const crClusterInfo = props => /*#__PURE__*/(0, _jsxRuntime.jsx)(_ClusterInfo.default, { ...props
});

exports.crClusterInfo = crClusterInfo;

const crInfo = _ref => {
  let {
    label,
    value
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
      children: [label, ":\xA0"]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      children: value || 'unknown'
    })]
  });
};

exports.crInfo = crInfo;
//# sourceMappingURL=MapFactory.js.map