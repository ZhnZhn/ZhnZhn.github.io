"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));

var _jsxRuntime = require("react/jsx-runtime");

const useCommandButtons = _hLoad => (0, _react.useMemo)(() => [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.Button.Load, {
  onClick: _hLoad
}, "load")], [_hLoad]);

var _default = useCommandButtons;
exports.default = _default;
//# sourceMappingURL=useCommandButtons.js.map