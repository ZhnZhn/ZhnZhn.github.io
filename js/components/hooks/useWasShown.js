"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
const useWasShown = isShow => {
  const _refWasShown = (0, _uiApi.useRef)(false);
  if (isShow) {
    (0, _uiApi.setRefValue)(_refWasShown, true);
  }
  return (0, _uiApi.getRefValue)(_refWasShown);
};
var _default = exports.default = useWasShown;
//# sourceMappingURL=useWasShown.js.map