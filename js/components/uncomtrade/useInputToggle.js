"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _uiApi = require("../uiApi");

var _useToggle = _interopRequireDefault(require("../hooks/useToggle"));

const useInputToggle = () => {
  const [isShowToggle, toggleInputs] = (0, _useToggle.default)(false),
        hideToggle = (0, _uiApi.useCallback)(() => {
    toggleInputs(false);
  }, [toggleInputs]);
  return [isShowToggle, toggleInputs, hideToggle];
};

var _default = useInputToggle;
exports.default = _default;
//# sourceMappingURL=useInputToggle.js.map