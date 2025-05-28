"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useToggle = require("../hooks/useToggle");
var _crIsId = require("./crIsId");
const useRowToggle = configs => {
  const [isRow, _toggleIsRow] = (0, _useToggle.useToggleState)({
      [_crIsId.PN_IS_SHOW_CHART]: !0
    }),
    [toggleIsRow, toggleIsChart] = (0, _uiApi.useMemo)(() => [id => _toggleIsRow((0, _crIsId.crIsId)(id)), () => _toggleIsRow(_crIsId.PN_IS_SHOW_CHART)], [_toggleIsRow]);
  (0, _uiApi.useEffect)(() => {
    _toggleIsRow(configs.reduce((_r, config) => {
      if (config.dfItem) {
        _r[(0, _crIsId.crIsId)(config.id)] = !0;
      }
      return _r;
    }, {}));
  }, [configs, _toggleIsRow]);
  return [isRow, toggleIsRow, toggleIsChart];
};
var _default = exports.default = useRowToggle;
//# sourceMappingURL=useRowToggle.js.map