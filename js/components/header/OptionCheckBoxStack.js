"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _getFnByPropName = _interopRequireDefault(require("../../utils/getFnByPropName"));
var _RowCheckBox = _interopRequireDefault(require("../dialogs/rows/RowCheckBox1"));
var _jsxRuntime = require("react/jsx-runtime");
const OptionCheckBoxStack = _ref => {
  let {
    data,
    configs
  } = _ref;
  const _hMode = (fnName, mode) => (0, _getFnByPropName.default)(data, fnName)(mode);
  return configs.map(_ref2 => {
    let [caption, id] = _ref2;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowCheckBox.default, {
      initValue: (0, _getFnByPropName.default)(data, id, false)(),
      caption: caption,
      onCheck: _hMode.bind(null, id, true),
      onUnCheck: _hMode.bind(null, id, false)
    }, caption);
  });
};
var _default = OptionCheckBoxStack;
exports.default = _default;
//# sourceMappingURL=OptionCheckBoxStack.js.map