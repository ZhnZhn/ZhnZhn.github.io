import { useState, useCallback, useEffect } from 'react';

import ChartTypes from '../dialogs/ChartTypes';
import D from '../dialogs/DialogCell';

import loadConfigs from './loadConfigs';
import usePreviousProps from './usePreviousProps';

const { crOptions } = ChartTypes
, { crDateConfig } = D
, MAP_FREQUENCY_DF = 'M';

const _loadDims = ({
  dims,
  proxy,
  baseMeta,
  dfProps,
}, _setConfigs) => {
  loadConfigs({ dims, proxy, baseMeta, ...dfProps })
   .then(_setConfigs)
   .catch(err => {
     _setConfigs({ errMsg: err.message })
   })
 };

const _crLoadState = () => ({
  isLoading: true,
  isLoadFailed: false
});

const _useIsLoadDims = (props, isLoadFailed) => {
  const prevProps = usePreviousProps(props);
  return isLoadFailed
    && !prevProps.isShow
    && props.isShow;
};

const useLoadDims = (props) => {
  const {
    chartsType,
    mapFrequency=MAP_FREQUENCY_DF,
    mapDateDf
  } = props;
  const  [
    {isLoading, isLoadFailed}, setLoad
  ] = useState(_crLoadState)
  , [validationMessages, setValidationMessages] = useState([])
  , [state, setState] = useState(()=>({
     configs: [],
     selectOptions: [],
     mapFrequency,
     chartOptions: crOptions(props),
     ...crDateConfig('EMPTY')
  }))
  , _setConfigs = useCallback(({
      configs,
      timeId,
      mapFrequency:mF,
      errMsg
    }) => {
      if (configs) {
        const _mF = mF || mapFrequency;
        setLoad({
          isLoading: false,
          isLoadFailed: false
        })
        setState({
         timeId,
         configs,
         selectOptions: configs
           .map(config => config.options),
         mapFrequency: _mF,
         chartOptions: crOptions({ configs, chartsType }),
         ...crDateConfig(_mF, mapDateDf)
        })
      } else {
        setLoad({
          isLoading: false,
          isLoadFailed: true
        })
        setValidationMessages([errMsg])
     }
   }, [chartsType, mapFrequency, mapDateDf])
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
        setLoad(_crLoadState)
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
