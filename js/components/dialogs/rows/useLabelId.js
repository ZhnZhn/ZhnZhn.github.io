"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../../uiApi");
const useLabelId = _ref => {
  let {
    isShowLabels
  } = _ref;
  const id = (0, _uiApi.useId)();
  return isShowLabels ? id : void 0;
};
var _default = exports.default = useLabelId;
//# sourceMappingURL=useLabelId.js.map