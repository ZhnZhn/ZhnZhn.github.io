"use strict";

exports.__esModule = true;
exports.default = void 0;

var _Input = require("./Input.Style");

var _jsxRuntime = require("react/jsx-runtime");

const Hr = _ref => {
  let {
    isValid
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("hr", {
    style: { ..._Input.S_HR,
      ...{
        borderColor: (0, _Input.getIsValidColor)(isValid)
      }
    }
  });
};

var _default = Hr;
exports.default = _default;
//# sourceMappingURL=Hr.js.map