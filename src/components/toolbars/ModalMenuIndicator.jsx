import {
  growthRate,
  changesBetween,
  normalize
} from '../../math/seriaFn';

import { S_MODAL_MENU } from './ModalMenu.Style';

import ModalPane from '../zhn-moleculs/ModalPane';
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

const ModalMenuIndicator = ({
   isShow,
   style,
   config,
   getChart=DF_GET_GHART,
   onClose,
   onAddMfi,
   onRemoveMfi
}) => getChart() ? (
  <ModalPane
    isShow={isShow}
    style={{...S_MODAL_MENU, ...style}}
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
  </ModalPane>
) : null;

export default ModalMenuIndicator
