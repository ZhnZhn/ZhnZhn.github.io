"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../../uiApi");
var _useTheme = _interopRequireDefault(require("../../hooks/useTheme"));
const TH_ID = 'ROW_CHECKBOX';
const useRowCheckBox = (value, hCheck, hUnCheck) => [(0, _useTheme.default)(TH_ID), (0, _uiApi.useCallback)(() => {
  if (value) {
    hUnCheck();
  } else {
    hCheck();
  }
}, [value, hCheck, hUnCheck])];
var _default = useRowCheckBox;
exports.default = _default;
//# sourceMappingURL=useRowCheckBox.js.map