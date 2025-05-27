"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useToggle = require("../hooks/useToggle");
var _crIsId = _interopRequireDefault(require("./crIsId"));
const useRowToggle = configs => {
  const [_isRow, _toggleIsRow] = (0, _useToggle.useToggleState)({
    isShowChart: !0
  });
  (0, _uiApi.useEffect)(() => {
    const _dfIs = configs.reduce((_r, config) => {
      if (config.dfItem) {
        _r[(0, _crIsId.default)(config.id)] = !0;
      }
      return _r;
    }, {});
    _toggleIsRow(_dfIs);
  }, [configs, _toggleIsRow]);
  return [_isRow, _toggleIsRow];
};
var _default = exports.default = useRowToggle;
//# sourceMappingURL=useRowToggle.js.map