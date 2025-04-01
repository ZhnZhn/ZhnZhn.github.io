import { filterBoolean } from '../../utils/arrFn';
import { useMemo } from '../uiApi';

import {
  RowSma,
  RowRsi
} from './fRowTaType1';

import RowMfi from './RowMfi';
import RowMomAth from './RowMomAth';

//[[RowComp, key, props], ...]
/*eslint-disable react-hooks/exhaustive-deps */
const useModalMenuIndicators = (
  config,
  onAddMfi,
  onRemoveMfi
) => useMemo(() => {
  const _isMfi = !!config.zhIsMfi
  , { btTitle } = (config.zhMiniConfigs || [])[0] || {}
  , _propsType1 = { config }
  , _propsType2 = { onAddMfi, onRemoveMfi };

  return filterBoolean([
    !(config.zhConfig || {}).isWithoutSma ? [
      RowSma, 'sma', {..._propsType1}
    ] : '',
    _isMfi ? [
      RowMfi, 'mfi', {..._propsType2}
    ] : '',
    config.zhIsMomAth ? [
      RowMomAth, 'ath', {..._propsType1}
    ] : '',
    _isMfi || (btTitle || '').indexOf('Volume') !== -1 ? [
      RowRsi, 'rsi', {..._propsType1}
    ] : ''
  ]);
}, [config]);
// onAddMfi, onRemoveMfi
/*eslint-enable react-hooks/exhaustive-deps */

export default useModalMenuIndicators
