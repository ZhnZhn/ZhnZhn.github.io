import { useRef, useState } from 'react';
import useRefInit from '../hooks/useRefInit'

import RowType2 from './RowType2'
import IndicatorBuilder from '../../charts/IndicatorBuilder';

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
  const _initialSma = useRefInit(() => _findInitSma(config))
  , _refPeriod = useRef()
  , [ smaConfs, setSmaConfs ] = useState([])
  , _onAddSma = () => {
      const period = _refPeriod.current.getValue()
      , id = _crId(period);
      if ( !_isInArrObjWithId(smaConfs, id)  ){
        const chart = getChart()
        , color = addSmaTo(chart, { id, period });
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
    <RowType2
      forwardRef={_refPeriod}
      caption="SMA"
      initValue={_initialSma}
      configs={smaConfs}
      onAdd={_onAddSma}
      onRemove={_onRemoveSma}
    />
  );
};

export default RowSma
