import {
  useRef,
  useState,
  getInputValue
} from '../uiApi';

import {
  crMfiConfig
} from '../../charts/IndicatorBuilder';
import RowType2 from './RowType2';


const _isInArrObjWithId = (
  arrObj,
  id
) => !!arrObj.find(obj => obj.id === id);

const _crMfiConfig = (id) => ({
  id: id,
  color: '#90ed7d'
});

const _crId = period => 'MFI(' + period + ')';

const RowMfi = ({
  getChart,
  onAddMfi,
  onRemoveMfi
}) => {
  const _refPeriod = useRef()
  , [
    mfiConfs,
    setMfiConfs
  ] = useState([])
  , _onAddMfi = () => {
      const _period = getInputValue(_refPeriod)
      , _id = _crId(_period);
      if (!_isInArrObjWithId(mfiConfs, _id)){
        const chart = getChart()
        , config = crMfiConfig(chart, _period, _id);
        if (config) {
          onAddMfi(config, _id)
          setMfiConfs([
            ...mfiConfs,
            _crMfiConfig(_id)
          ])
        }
      }
    }
  , _onRemoveMfi = (id) => {
     onRemoveMfi(id);
     setMfiConfs(mfiConfs.filter(d => d.id !== id))
  };
  return (
    <RowType2
      forwardRef={_refPeriod}
      caption="MFI"
      initValue={30}
      configs={mfiConfs}
      onAdd={_onAddMfi}
      onRemove={_onRemoveMfi}
    />
  );
};

export default RowMfi
