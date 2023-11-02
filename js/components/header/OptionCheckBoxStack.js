"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _styleFn = require("../styleFn");
var _getFnByPropName = _interopRequireDefault(require("../../utils/getFnByPropName"));
var _RowCheckBox = _interopRequireDefault(require("../dialogs/rows/RowCheckBox1"));
var _jsxRuntime = require("react/jsx-runtime");
const OptionCheckBoxStack = _ref => {
  let {
    data,
    configs
  } = _ref;
  const _hMode = (fnName, mode) => (0, _getFnByPropName.default)(data, fnName)(mode),
    _colorBlack = (0, _styleFn.getColorBlack)();
  return configs.map(_ref2 => {
    let [caption, id] = _ref2;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowCheckBox.default, {
      caption: caption,
      initialValue: (0, _getFnByPropName.default)(data, id, false)(),
      color: _colorBlack,
      onCheck: (0, _uiApi.bindTo)(_hMode, id, true),
      onUnCheck: (0, _uiApi.bindTo)(_hMode, id, false)
    }, caption);
  });
};
var _default = exports.default = OptionCheckBoxStack;
//# sourceMappingURL=OptionCheckBoxStack.js.map