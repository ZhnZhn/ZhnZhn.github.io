import {
  isNumber,
  useRef,
  getInputValue
} from '../uiApi';

import { useRefInit } from '../hooks/useProperty';

import {
  addCategoryRateTo,
  addCategoryDiffTo,
  addCategoryRocTo,
  powerBy10
} from '../../charts/IndicatorBuilder';

import { useModalPopup } from '../zhn-moleculs/ModalPopup';
import crModalPopup from './crModalPopup';

import RowTypeA from './RowTypeA';
import RowTypeB from './RowTypeB';

const S_MENU_PANE = {
  margin: '4px 10px 8px 8px'
}
, DF_POWER_BY_10 = 0
, _isPowerBy = (
  config
) => !config?.plotOptions?.bar?.dataLabels?.enabled;

const ModalMenuInd2View = ({
  style,
  isShow,
  onClose,
  getChart,
  config
}) => {
  const refFirstItem = useModalPopup()[0]
  , _hasPowerBy10 = useRefInit(() => _isPowerBy(config))
  , _refPowerBy10 = useRef(DF_POWER_BY_10)
  , _onPowerBy10 = () => {
    const _by = parseFloat(getInputValue(_refPowerBy10));
    if (isNumber(_by)) {
       powerBy10(getChart(), _by)
       return !0;
    }
  };

  return (
    <div style={S_MENU_PANE}>
      <RowTypeA
        refEl={refFirstItem}
        caption="Rate (S1/S2)"
        mathFn={addCategoryRateTo}
        getChart={getChart}
      />
      <RowTypeA
        caption="Diff (S1-S2)"
        mathFn={addCategoryDiffTo}
        getChart={getChart}
      />
      <RowTypeA
        caption="ROC (S1 from S2)"
        mathFn={addCategoryRocTo}
        getChart={getChart}
      />
      {_hasPowerBy10 && <RowTypeB
        refEl={_refPowerBy10}
        caption="S1*PowerOf 10"
        initValue={DF_POWER_BY_10}
        min={-9}
        max={9}
        onAdd={_onPowerBy10}
      />
     }
    </div>
  );
};

export default crModalPopup(ModalMenuInd2View)
