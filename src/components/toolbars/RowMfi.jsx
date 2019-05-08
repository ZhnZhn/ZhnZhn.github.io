import React, { useRef, useState } from 'react'

import IndicatorBuilder from '../../charts/IndicatorBuilder';

import RowCaptionInput from './RowCaptionInput'
import SeriaConfigs from './SeriaConfigs'

const { crMfiConfig } = IndicatorBuilder;

const _isInArrObjWithId = (arrObj, id) => {
  return !!arrObj.find(obj => obj.id === id);
};

const _crMfiConfig = (id) => ({
  id: id,
  color: '#90ed7d'
});

const _crId = period => 'MFI(' + period + ')';

const RowMfi = ({ getChart, onAddMfi, onRemoveMfi }) => {
  const _refPeriod = useRef()
  , [ mfiConfs, setMfiConfs ] = useState([])
  , _onAddMfi = () => {
     const _period = _refPeriod.current.getValue()
          , _id = _crId(_period);
      if ( !_isInArrObjWithId(mfiConfs, _id) ){
        const chart = getChart()
        , config = crMfiConfig(chart, _period, _id);
        if (config) {
          onAddMfi(config, _id)
          setMfiConfs([ ...mfiConfs, _crMfiConfig(_id)])
        }
      }
    }
  , _onRemoveMfi = (id) => {
     onRemoveMfi(id);
     setMfiConfs(mfiConfs.filter(d => d.id !== id))
  };
  return (
    <React.Fragment>
      <RowCaptionInput
        caption="MFI"
        forwardRef={_refPeriod}
        initValue={14}
        onAdd={_onAddMfi}
      />
      <SeriaConfigs
        configs={mfiConfs}
        onRemove={_onRemoveMfi}
      />
    </React.Fragment>
  );
};

export default RowMfi
