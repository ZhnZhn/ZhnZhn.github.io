import { useRef } from '../uiApi';
import useRefInit from '../hooks/useRefInit'
import {
  addCategoryRateTo,
  addCategoryDiffTo,
  addCategoryRocTo,
  powerBy10
} from '../../charts/IndicatorBuilder'

import ModalPopup from '../zhn-moleculs/ModalPopup'
import { S_MODAL_MENU } from './ModalMenu.Style'

import RowTypeA from './RowTypeA'
import RowTypeB from './RowTypeB'

const DF_POWER_BY_10 = 0
, S_PANE = { margin: '6px 10px 6px 6px' }

, _isNumber = n => typeof n === 'number'
    && n-n === 0

, _isPowerBy = config => !config
    ?.plotOptions?.bar?.dataLabels?.enabled;

const ModalMenuInd2 = ({
  style,
  isShow,
  onClose,
  getChart,
  config
}) => {
  const _hasPowerBy10 = useRefInit(() => _isPowerBy(config))
  , _refPowerBy10 = useRef(DF_POWER_BY_10)
  , _onPowerBy10 = () => {
    const _by = parseFloat(_refPowerBy10.current.getValue());
    if (_isNumber(_by)) {
       powerBy10(getChart(), _by)
       return true;
    }
  };

  return (
    <ModalPopup
      style={{...S_MODAL_MENU, ...style}}
      isShow={isShow}
      onClose={onClose}
    >
      <div style={S_PANE}>
        <RowTypeA
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
           forwardRef={_refPowerBy10}
           caption="S1*Power of 10"
           initValue={DF_POWER_BY_10}
           min={-9}
           max={9}
           maxLength={2}
           onAdd={_onPowerBy10}
        />
       }
      </div>
    </ModalPopup>
  );
};

export default ModalMenuInd2
