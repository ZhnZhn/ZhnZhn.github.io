import { useState, useCallback, useEffect } from 'react';

import ChartTypes from '../dialogs/ChartTypes';
import D from '../dialogs/DialogCell';

import loadConfigs from './loadConfigs';
import usePreviousProps from './usePreviousProps';

const { crOptions } = ChartTypes
, { crDateConfig } = D
, MAP_FREQUENCY_DF = 'M'
, _crOptionItem = (caption, value) => ({
  caption,
  value
});

const _loadDims = ({
  dims,
  proxy,
  baseMeta,
  loadId,
  mapFrequency,
  dfProps,
}, _setConfigs) => {
  loadConfigs({ dims, proxy, baseMeta, loadId, mapFrequency, ...dfProps })
   .then(_setConfigs)
   .catch(err => {
     _setConfigs({ errMsg: err.message })
   })
 };

const _crLoadingState = () => ({
  isLoading: true,
  isLoadFailed: false
});

const _useIsLoadDims = (props, isLoadFailed) => {
  const prevProps = usePreviousProps(props);
  return isLoadFailed
    && !prevProps.isShow
    && props.isShow;
};

const _crDateOptions = (configs, _mF, mapDateDf) => {
  const {dateOptions} = configs;
  if (dateOptions) {
    return [dateOptions, dateOptions[0]];
  }
  const {
    dateOptions:dO,
    dateDefault
  } = crDateConfig(_mF, mapDateDf);
  return [
    dO,
    _crOptionItem(dateDefault, dateDefault)
  ];
};

const _crSelectOptions = configs => configs
  .map(config => config.options);

const _crDimOptions = configs => {
 const _dimOptions = [];
  configs.forEach(config => {
    if ((config.options || []).length > 1) {
      _dimOptions.push(
        _crOptionItem(config.caption, config.id)
      )
    }
  })
 return _dimOptions;
};

const useLoadDims = (props) => {
  const {
    chartsType,
    mapFrequency,
    mapDateDf,
    dfProps={}
  } = props
  , _mapFrequency = dfProps.mapFrequency
     || mapFrequency
     || MAP_FREQUENCY_DF
  , _mapDateDf = dfProps.mapDateDf
     || mapDateDf
  , [{isLoading, isLoadFailed}, setLoad] = useState(_crLoadingState)
  , [validationMessages, setValidationMessages] = useState([])
  , [state, setState] = useState(()=>({
     configs: [],
     selectOptions: [],
     mapFrequency,
     chartOptions: crOptions(props),
     dateOptions: []
  }))
  , _setConfigs = useCallback(({
      configs,
      timeId,
      mapFrequency:mF,
      errMsg
    }) => {
      if (configs) {
        const _mF = mF || _mapFrequency
        , [
          dateOptions,
          dateDf
        ] = _crDateOptions(configs, _mF, _mapDateDf);
        setLoad({
          isLoading: false,
          isLoadFailed: false
        })
        setState({
         timeId,
         configs,
         selectOptions: _crSelectOptions(configs),
         mapFrequency: _mF,
         dimOptions: _crDimOptions(configs),
         chartOptions: crOptions({ configs, chartsType }),
         dateOptions,
         dateDf
        })
      } else {
        setLoad({
          isLoading: false,
          isLoadFailed: true
        })
        setValidationMessages([errMsg])
     }
   }, [chartsType, _mapFrequency, _mapDateDf])
   , _isLoadDims = _useIsLoadDims(props, isLoadFailed);

    /*eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
      _loadDims(props, _setConfigs)
    }, [])
    //props, _setConfigs
    /*eslint-enable react-hooks/exhaustive-deps */
    useEffect(()=>{
      if (_isLoadDims) {
        _loadDims(props, _setConfigs)
        setLoad(_crLoadingState)
      }
    }, [_isLoadDims, props, _setConfigs])

  return [
    state,
    isLoading,
    isLoadFailed,
    validationMessages,
    setValidationMessages,
    setState
  ];
};

export default useLoadDims
