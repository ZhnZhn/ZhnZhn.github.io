import {
  growthRate,
  changesBetween,
  normalize
} from '../../math/seriaFn';

import useModalMenuIndicators from './useModalMenuIndicators';

import { INDICATOR_TYPE_1 } from './IndicatorType';
import { S_MODAL_MENU } from './ModalMenu.Style';

import ModalPopup from '../zhn-moleculs/ModalPopup';
import RowFnType1 from './RowFnType1';
import RowNorm from './RowNorm';

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
}) => {
  const indicatorConfigs = useModalMenuIndicators(config)
  , _chartInst = getChart();

  return _chartInst ? (
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
        <RowNorm
           caption={NORM_CAPTION_EL}
           configArr={FN_NORM}
           getChart={getChart}
        />
        {
          indicatorConfigs.map(([RowComp, key, type]) => {
            const _restProps = type === INDICATOR_TYPE_1
              ? { config }
              : { onAddMfi, onRemoveMfi };
            return (
              <RowComp
                {..._restProps}
                key={key}
                getChart={getChart}
            />
          )})
        }
      </div>
    </ModalPopup>
  ) : null;
};

export default ModalMenuIndicator
