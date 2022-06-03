"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _useRefInit = _interopRequireDefault(require("../../hooks/useRefInit"));

var _DialogCell = _interopRequireDefault(require("../DialogCell"));

var _jsxRuntime = require("react/jsx-runtime");

const useCommandButtons = hLoad => (0, _useRefInit.default)(() => [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.Button.Load, {
  onClick: hLoad
}, "load")]);

var _default = useCommandButtons;
exports.default = _default;
//# sourceMappingURL=useCommandButtons.js.map