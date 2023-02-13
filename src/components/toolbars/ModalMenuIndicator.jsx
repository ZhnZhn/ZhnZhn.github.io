import {
  useMemo
} from '../uiApi';

import {
  growthRate,
  changesBetween,
  normalize
} from '../../math/seriaFn';

import useAddSeriaBy from './useAddSeriaBy';
import useMomAth from './useMomAth';

import ModalPopup from '../zhn-moleculs/ModalPopup';

import RowType1 from './RowType1';
import RowPlusMinus from './RowPlusMinus';
import RowSma from './RowSma';
import RowRsi from './RowRsi';
import RowMfi from './RowMfi';

import { S_MODAL_MENU } from './ModalMenu.Style';

const C_GROW = '#90ed7d'
, S_PANE = {
   width: 265,
   margin: 8
};

const FN_ROC = ['ROC', C_GROW, growthRate, true]
, FN_DIFF = ['DIFF', C_GROW, changesBetween, true]
, FN_NORM = ['NORM', C_GROW, normalize, false];

const NORM_CAPTION_EL = (
  <>
    Normalize (100*y<sub>t</sub>/y<sub>0</sub>)
  </>
);

const DF_GET_GHART = () => {};

const ModalMenuIndicator = ({
   isShow,
   style,
   config,
   getChart=DF_GET_GHART,
   onClose,
   onAddMfi,
   onRemoveMfi
}) => {
  const [
    isChanges,
    addChanges,
    removeChanges
  ] = useAddSeriaBy(FN_DIFF, getChart)
  , [
    isGrowthRate,
    addGrowthRate,
    removeGrowtRate
  ] = useAddSeriaBy(FN_ROC, getChart)
  , [
    isNormalize,
    addNormalize,
    removeNormalize
  ] = useAddSeriaBy(FN_NORM, getChart)
  , [
    _isSma,
    _isMfi,
    _isMomAth,
    _isRsi
  ] = useMemo(() => {
    const { zhConfig } = config
    , _isMfi = !!config.zhIsMfi
    , { btTitle } = (config.zhMiniConfigs || [])[0] || {};
    return [
      !(zhConfig || {}).isWithoutSma,
      _isMfi,
      !!config.zhIsMomAth,
      _isMfi || (btTitle || '').indexOf('Volume') !== -1
    ];
  }, [config])
  , [
    isMomAth,
    _addMomAth,
    _removeMomAth
  ] = useMomAth(
     _isMomAth,
     getChart,
     onAddMfi,
     onRemoveMfi
  );

  return (
    <ModalPopup
      style={{...S_MODAL_MENU, ...style}}
      isShow={isShow}
      onClose={onClose}
    >
      <div style={S_PANE}>
        <RowType1
          is={isChanges}
          caption="Changes Between"
          onMinus={removeChanges}
          onPlus={addChanges}
        />
        <RowType1
          is={isGrowthRate}
          caption="Growth Rate"
          onMinus={removeGrowtRate}
          onPlus={addGrowthRate}
        />
        <RowPlusMinus
          is={isNormalize}
          caption={NORM_CAPTION_EL}
          onMinus={removeNormalize}
          onPlus={addNormalize}
        />
        {_isSma && <RowSma
            config={config}
            getChart={getChart}
          />
        }
        {_isRsi && <RowRsi
            config={config}
            getChart={getChart}
          />
        }
        {_isMfi && <RowMfi
            getChart={getChart}
            onAddMfi={onAddMfi}
            onRemoveMfi={onRemoveMfi}
         />
        }
        {_isMomAth && <RowPlusMinus
           is={isMomAth}
           caption="MOM(1) & ATH"
           onPlus={_addMomAth}
           onMinus={_removeMomAth}
         />
        }
      </div>
    </ModalPopup>
  );
}

export default ModalMenuIndicator
