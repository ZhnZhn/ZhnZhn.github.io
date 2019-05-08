import React, { useRef, useState } from 'react';
import useRefInit from '../hooks/useRefInit'

import IndicatorBuilder from '../../charts/IndicatorBuilder';

import RowCaptionInput from './RowCaptionInput'
import SeriaConfigs from './SeriaConfigs'

const {
  addSmaTo,
  removeSeriaFrom
 } = IndicatorBuilder;

const _isArray = Array.isArray;

const SMA = {
  MONTH: '12',
  YEAR: '50'
};
const _findInitSma = (config) => {
  const _d = (((config || {}).series || [])[0] || {}).data;
  return !_isArray(_d)
    ? '0'
    : _d.length > 150
         ? SMA.YEAR : SMA.MONTH;
};

const _isInArrObjWithId = (arrObj, id) => {
  return !!arrObj.find(obj => obj.id === id);
};

const _crId = period => `SMA(${period})`;

const RowSma = ({
  config,
  getChart
}) => {
  const _refInitialSma = useRef(null)
  , _initialSma = useRefInit(_refInitialSma, () => _findInitSma(config))
  , _refPeriod = useRef()
  , [ smaConfs, setSmaConfs ] = useState([])
  , _onAddSma = () => {
      const period = _refPeriod.current.getValue()
      , id = _crId(period);
      if ( !_isInArrObjWithId(smaConfs, id)  ){
        const chart = getChart()
        , color = addSmaTo(chart, {
             id, period, isPlus: false
          });
        if (color){
          setSmaConfs([...smaConfs, { id, color }])
        }
      }
    }
  , _onRemoveSma = (id) => {
    const chart = getChart();
    if ( removeSeriaFrom(chart, id) ){
      setSmaConfs(smaConfs.filter(d => d.id !== id))
    }
  };

  return (
    <React.Fragment>
      <RowCaptionInput
        caption="SMA"
        forwardRef={_refPeriod}
        initValue={_initialSma}
        onAdd={_onAddSma}
      />
      <SeriaConfigs
        configs={smaConfs}
        onRemove={_onRemoveSma}
      />
    </React.Fragment>
  );
};

export default RowSma
