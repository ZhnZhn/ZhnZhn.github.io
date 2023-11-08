"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _IndicatorType = require("./IndicatorType");
var _fRowTaType = require("./fRowTaType1");
var _RowMfi = _interopRequireDefault(require("./RowMfi"));
var _RowMomAth = _interopRequireDefault(require("./RowMomAth"));
//[[RowComp, key, type], ...]
const useModalMenuIndicators = config => (0, _uiApi.useMemo)(() => {
  const {
      zhConfig
    } = config,
    _isMfi = !!config.zhIsMfi,
    {
      btTitle
    } = (config.zhMiniConfigs || [])[0] || {},
    indicatorConfigs = [];
  if (!(zhConfig || {}).isWithoutSma) {
    indicatorConfigs.push([_fRowTaType.RowSma, 'sma', _IndicatorType.INDICATOR_TYPE_1]);
  }
  if (_isMfi) {
    indicatorConfigs.push([_RowMfi.default, 'mfi', _IndicatorType.INDICATOR_TYPE_2]);
  }
  if (config.zhIsMomAth) {
    indicatorConfigs.push([_RowMomAth.default, 'ath', _IndicatorType.INDICATOR_TYPE_2]);
  }
  if (_isMfi || (btTitle || '').indexOf('Volume') !== -1) {
    indicatorConfigs.push([_fRowTaType.RowRsi, 'rsi', _IndicatorType.INDICATOR_TYPE_1]);
  }
  return indicatorConfigs;
}, [config]);
var _default = exports.default = useModalMenuIndicators;
//# sourceMappingURL=useModalMenuIndicators.js.map