"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useToggle = require("../hooks/useToggle");
const useInputToggle = () => {
  const [isShowToggle, toggleInputs] = (0, _useToggle.useToggle)(false),
    hideToggle = (0, _uiApi.useCallback)(() => {
      toggleInputs(false);
    }, [toggleInputs]);
  return [isShowToggle, toggleInputs, hideToggle];
};
var _default = exports.default = useInputToggle;
//# sourceMappingURL=useInputToggle.js.map