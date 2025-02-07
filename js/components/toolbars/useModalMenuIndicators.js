"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _fRowTaType = require("./fRowTaType1");
var _RowMfi = _interopRequireDefault(require("./RowMfi"));
var _RowMomAth = _interopRequireDefault(require("./RowMomAth"));
//[[RowComp, key, props], ...]
/*eslint-disable react-hooks/exhaustive-deps */
const useModalMenuIndicators = (config, onAddMfi, onRemoveMfi) => (0, _uiApi.useMemo)(() => {
  const _isMfi = !!config.zhIsMfi,
    {
      btTitle
    } = (config.zhMiniConfigs || [])[0] || {},
    _propsType1 = {
      config
    },
    _propsType2 = {
      onAddMfi,
      onRemoveMfi
    };
  return [!(config.zhConfig || {}).isWithoutSma ? [_fRowTaType.RowSma, 'sma', {
    ..._propsType1
  }] : '', _isMfi ? [_RowMfi.default, 'mfi', {
    ..._propsType2
  }] : '', config.zhIsMomAth ? [_RowMomAth.default, 'ath', {
    ..._propsType1
  }] : '', _isMfi || (btTitle || '').indexOf('Volume') !== -1 ? [_fRowTaType.RowRsi, 'rsi', {
    ..._propsType1
  }] : ''].filter(Boolean);
}, [config]);
// onAddMfi, onRemoveMfi
/*eslint-enable react-hooks/exhaustive-deps */
var _default = exports.default = useModalMenuIndicators;
//# sourceMappingURL=useModalMenuIndicators.js.map