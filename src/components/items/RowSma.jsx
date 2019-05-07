import React, { useRef, useState } from 'react';
import useRefInit from '../hooks/useRefInit'

import IndicatorBuilder from '../../charts/IndicatorBuilder';

import InputText from '../zhn/InputText';
import SvgPlus from '../zhn/SvgPlus';
import SvgMinus from '../zhn/SvgMinus';

const {
  addSmaTo,
  removeSeriaFrom
 } = IndicatorBuilder;

const S = {
  CAPTION: {
    display: 'inline-block',
    color: 'black',
    width: 48,
    fontWeight : 'bold',
  },
  INPUT_TEXT: {
    width: 56
  },
  ROW: {
    paddingTop: 5
  },
  fnSpan: (color) => ({
    color, paddingLeft: 8
  })
};

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
  , [ smaConfs, setSmaConfs ] = useState([]);
  const _onAddSma = () => {
    const period = _refPeriod.current.getValue()
    , id = _crId(period);

    if ( !_isInArrObjWithId(smaConfs, id)  ){
       const chart = getChart()
       , color = addSmaTo(chart, {
           id, period, isPlus: false
         });
       if (color){
         smaConfs.push({ id, color })
         setSmaConfs([...smaConfs])
       }
    }
  },
  _onRemoveSma = (id) => {
    const chart = getChart();
    if ( removeSeriaFrom(chart, id) ){
      setSmaConfs(smaConfs.filter(d => d.id !== id))
    }
  }

  const _renderConfigs = (confs) => {
    const _confEls = confs.map(conf => {
      const { id, color } = conf;
      return (
        <div key={id} style={S.ROW}>
          <SvgMinus
             onClick={_onRemoveSma.bind(null, id)}
          />
          <span style={S.fnSpan(color)}>{id}</span>
        </div>
      )
    });
    return (
      <div>
         {_confEls}
      </div>
    );
  }
  return (
    <React.Fragment>
      <div>
        <span style={S.CAPTION}>SMA</span>
        <InputText
           ref={_refPeriod}
           type="number"
           style={S.INPUT_TEXT}
           initValue={_initialSma}
           onEnter={_onAddSma}
        />
        <SvgPlus onClick={_onAddSma} />
      </div>
      {_renderConfigs(smaConfs)}
    </React.Fragment>
  );
};

export default RowSma
