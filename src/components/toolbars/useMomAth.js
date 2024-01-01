import { useMemo } from '../uiApi';
import { useBool } from '../hooks/useBool';

import {
  crMomAthConfig
} from '../../charts/IndicatorBuilder';

const MOM_ATH = 'MOM_ATH';

const useMomAth = (
  getChart,
  onAddMfi,
  onRemoveMfi
) => {
  /*eslint-disable react-hooks/exhaustive-deps */
  const [
    _isMomAth,
    showMomAth,
    hideMomAth
  ] = useBool()
  , [
    _addMomAth,
    _removeMomAth
  ] = useMemo(() => [
    () => {
      const _chart = getChart()
      , _momAthConfig = crMomAthConfig(_chart);
      if (_momAthConfig) {
        onAddMfi(_momAthConfig, MOM_ATH)
        showMomAth()
      }
    },
    () => {
      onRemoveMfi(MOM_ATH)
      hideMomAth()
    }
  ], [getChart, onAddMfi, onRemoveMfi]);

  return [
    _isMomAth,
    _addMomAth,
    _removeMomAth
  ];
}

export default useMomAth
