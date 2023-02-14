import {
  useMemo
} from '../uiApi';

import {
  growthRate,
  changesBetween,
  normalize
} from '../../math/seriaFn';

import ModalPopup from '../zhn-moleculs/ModalPopup';

import RowFnType1 from './RowFnType1';
import RowFnPlusMinus from './RowFnPlusMinus';
import RowSma from './RowSma';
import RowRsi from './RowRsi';
import RowMfi from './RowMfi';
import RowMomAth from './RowMomAth';

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
  }, [config]);

  return (
    <ModalPopup
      style={{...S_MODAL_MENU, ...style}}
      isShow={isShow}
      onClose={onClose}
    >
      <div style={S_PANE}>
        <RowFnType1
           caption="Changes Between"
           configArr={FN_DIFF}
           getChart={getChart}
        />
        <RowFnType1
           caption="Growth Rate"
           configArr={FN_ROC}
           getChart={getChart}
        />
        <RowFnPlusMinus
          caption={NORM_CAPTION_EL}
          configArr={FN_NORM}
          getChart={getChart}
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
        {_isMomAth && <RowMomAth
             getChart={getChart}
             onAddMfi={onAddMfi}
             onRemoveMfi={onRemoveMfi}
          />
        }
      </div>
    </ModalPopup>
  );
}

export default ModalMenuIndicator
