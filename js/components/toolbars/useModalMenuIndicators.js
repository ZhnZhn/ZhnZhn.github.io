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
  const _isMfi = !!config.zhIsMfi,
    {
      btTitle
    } = (config.zhMiniConfigs || [])[0] || {};
  return [!(config.zhConfig || {}).isWithoutSma ? [_fRowTaType.RowSma, 'sma', _IndicatorType.INDICATOR_TYPE_1] : '', _isMfi ? [_RowMfi.default, 'mfi', _IndicatorType.INDICATOR_TYPE_2] : '', config.zhIsMomAth ? [_RowMomAth.default, 'ath', _IndicatorType.INDICATOR_TYPE_2] : '', _isMfi || (btTitle || '').indexOf('Volume') !== -1 ? [_fRowTaType.RowRsi, 'rsi', _IndicatorType.INDICATOR_TYPE_1] : ''].filter(Boolean);
}, [config]);
var _default = exports.default = useModalMenuIndicators;
//# sourceMappingURL=useModalMenuIndicators.js.map