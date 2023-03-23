"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useToggleState = _interopRequireDefault(require("../hooks/useToggleState"));
var _crIsId = _interopRequireDefault(require("./crIsId"));
const useRowToggle = configs => {
  const [_isRow, _toggleIsRow] = (0, _useToggleState.default)({
    isShowChart: true,
    isShowDate: false
  });
  (0, _uiApi.useEffect)(() => {
    const _dfIs = configs.reduce((_r, config) => {
      if (config.dfItem) {
        _r[(0, _crIsId.default)(config.id)] = true;
      }
      return _r;
    }, {});
    _toggleIsRow(_dfIs);
  }, [configs, _toggleIsRow]);
  return [_isRow, _toggleIsRow];
};
var _default = useRowToggle;
exports.default = _default;
//# sourceMappingURL=useRowToggle.js.map