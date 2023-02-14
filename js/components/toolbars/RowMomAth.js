"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _RowPlusMinus = _interopRequireDefault(require("./RowPlusMinus"));
var _useMomAth = _interopRequireDefault(require("./useMomAth"));
var _jsxRuntime = require("react/jsx-runtime");
const RowMomAth = _ref => {
  let {
    getChart,
    onAddMfi,
    onRemoveMfi
  } = _ref;
  const [isMomAth, addMomAth, removeMomAth] = (0, _useMomAth.default)(getChart, onAddMfi, onRemoveMfi);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowPlusMinus.default, {
    is: isMomAth,
    caption: "MOM(1) & ATH",
    onPlus: addMomAth,
    onMinus: removeMomAth
  });
};
var _default = RowMomAth;
exports.default = _default;
//# sourceMappingURL=RowMomAth.js.map