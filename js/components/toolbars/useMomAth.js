"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useBool = _interopRequireDefault(require("../hooks/useBool"));
var _IndicatorBuilder = require("../../charts/IndicatorBuilder");
const MOM_ATH = 'MOM_ATH';
const useMomAth = (getChart, onAddMfi, onRemoveMfi) => {
  /*eslint-disable react-hooks/exhaustive-deps */
  const [_isMomAth, showMomAth, hideMomAth] = (0, _useBool.default)(),
    [_addMomAth, _removeMomAth] = (0, _uiApi.useMemo)(() => [() => {
      const _chart = getChart(),
        _momAthConfig = (0, _IndicatorBuilder.crMomAthConfig)(_chart);
      if (_momAthConfig) {
        onAddMfi(_momAthConfig, MOM_ATH);
        showMomAth();
      }
    }, () => {
      onRemoveMfi(MOM_ATH);
      hideMomAth();
    }], [getChart, onAddMfi, onRemoveMfi]);
  return [_isMomAth, _addMomAth, _removeMomAth];
};
var _default = useMomAth;
exports.default = _default;
//# sourceMappingURL=useMomAth.js.map