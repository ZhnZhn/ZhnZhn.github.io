import { useMemo } from '../uiApi';

import {
  INDICATOR_TYPE_1,
  INDICATOR_TYPE_2
} from './IndicatorType';

import {
  RowSma,
  RowRsi
} from './fRowTaType1';

import RowMfi from './RowMfi';
import RowMomAth from './RowMomAth';

//[[RowComp, key, type], ...]
const useModalMenuIndicators = (
  config
) => useMemo(() => {
  const _isMfi = !!config.zhIsMfi
  , { btTitle } = (config.zhMiniConfigs || [])[0] || {};

  return [
    !(config.zhConfig || {}).isWithoutSma ? [
      RowSma, 'sma', INDICATOR_TYPE_1
    ] : '',
    _isMfi ? [
      RowMfi, 'mfi', INDICATOR_TYPE_2
    ] : '',
    config.zhIsMomAth ? [
      RowMomAth, 'ath', INDICATOR_TYPE_2
    ] : '',
    _isMfi || (btTitle || '').indexOf('Volume') !== -1 ? [
      RowRsi, 'rsi', INDICATOR_TYPE_1
    ] : '' 
  ].filter(Boolean);
}, [config]);


export default useModalMenuIndicators
