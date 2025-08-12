import {
  growthRate,
  changesBetween,
  normalize
} from '../../math/seriaFn';

import { useModalPopup } from '../zhn-moleculs/ModalPopup';
import crModalPopup from './crModalPopup';

import RowFnType1 from './RowFnType1';
import RowNorm from './RowNorm';
import { RowIndicators } from './RowIndicators';

const C_GROW = '#90ed7d'
, S_PANE = {
   width: 265,
   margin: 8
};

const FN_ROC = ['ROC', C_GROW, growthRate, true]
, FN_DIFF = ['DIFF', C_GROW, changesBetween, true]
, FN_NORM = ['NORM', C_GROW, normalize, true];

const NORM_CAPTION_EL = (
  <>
    Normalize (100*y<sub>t</sub>/y<sub>0</sub>)
  </>
);

const DF_GET_GHART = () => {};

const ModalMenuIndicatorView = ({
  isShow,
  style,
  config,
  getChart=DF_GET_GHART,
  onClose,
  onAddMfi,
  onRemoveMfi
}) => {
  const refFirstItem = useModalPopup()[0];
  return getChart() ? (
    <div style={S_PANE}>
      <RowFnType1
         refEl={refFirstItem}
         caption="Changes Between"
         configArr={FN_DIFF}
         getChart={getChart}
      />
      <RowFnType1
         caption="Growth Rate"
         configArr={FN_ROC}
         getChart={getChart}
      />
      <RowNorm
         caption={NORM_CAPTION_EL}
         configArr={FN_NORM}
         getChart={getChart}
      />
      <RowIndicators
         config={config}
         getChart={getChart}
         onAddMfi={onAddMfi}
         onRemoveMfi={onRemoveMfi}
      />
    </div>
  ) : null;
};

export default crModalPopup(ModalMenuIndicatorView)
