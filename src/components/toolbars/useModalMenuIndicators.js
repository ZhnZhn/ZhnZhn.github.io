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
  const { zhConfig } = config
  , _isMfi = !!config.zhIsMfi
  , { btTitle } = (config.zhMiniConfigs || [])[0] || {}
  , indicatorConfigs = [];

  if (!(zhConfig || {}).isWithoutSma) {
    indicatorConfigs.push([RowSma, 'sma', INDICATOR_TYPE_1])
  }
  if (_isMfi) {
    indicatorConfigs.push([RowMfi, 'mfi', INDICATOR_TYPE_2])
  }
  if (config.zhIsMomAth) {
    indicatorConfigs.push([RowMomAth, 'ath', INDICATOR_TYPE_2])
  }
  if (_isMfi || (btTitle || '').indexOf('Volume') !== -1) {
    indicatorConfigs.push([RowRsi, 'rsi', INDICATOR_TYPE_1])
  }

  return indicatorConfigs;
}, [config]);


export default useModalMenuIndicators
