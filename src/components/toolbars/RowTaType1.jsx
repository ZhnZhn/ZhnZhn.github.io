import {
  useRef,
  useState,
  getInputValue
} from '../uiApi';
import useRefInit from '../hooks/useRefInit';

import {
  removeSeriaFrom
} from '../../charts/IndicatorBuilder';

import RowType2 from './RowType2';

const _isInArrObjWithId = (
  arrObj,
  id
) => !!arrObj.find(obj => obj.id === id);

const _crId = (
  caption,
  period
) => `${caption}(${period})`;

const RowTaType1 = ({
  caption,
  config,
  getChart,
  crInitialPeriod,
  addTaTo
}) => {
  const _initialTaPeriod = useRefInit(
    () => crInitialPeriod(config)
  )
  , _refPeriodInput = useRef()
  , [
    taConfs,
    setTaConfs
  ] = useState([])
  , _onAddTa = () => {
      const period = getInputValue(_refPeriodInput)
      , id = _crId(caption, period);
      if (!_isInArrObjWithId(taConfs, id)){
        const chart = getChart()
        , color = addTaTo(chart, { id, period });
        if (color){
          setTaConfs([...taConfs, { id, color }])
        }
      }
    }
  , _onRemoveTa = (id) => {
     const chart = getChart();
     if (removeSeriaFrom(chart, id)){
       setTaConfs(taConfs.filter(d => d.id !== id))
     }
  };

  return (
    <RowType2
      forwardRef={_refPeriodInput}
      caption={caption}
      initValue={_initialTaPeriod}
      configs={taConfs}
      onAdd={_onAddTa}
      onRemove={_onRemoveTa}
    />
  );
};

export default RowTaType1
