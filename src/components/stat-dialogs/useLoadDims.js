import {
  useState,
  useCallback,
  useEffect
} from '../uiApi';

import useHasBeenOpen from '../hooks/useHasBeenOpen';

import { crDialogChartOptions } from '../dialogs/ChartOptionsFn';
import crDateConfig from '../dialogs/fns/crDateConfig';

import loadConfigs from './dimensions/loadConfigs';

const MAP_FREQUENCY_DF = 'M'
, _crOptionItem = (
  caption,
  value
) => ({
  caption,
  value
});

const _loadDims = ({
  dims,
  proxy,
  baseMeta,
  loadId,
  mapFrequency,
  dfProps
}, _setConfigs) => {
  loadConfigs({
      dims,
      proxy,
      baseMeta,
      loadId,
      mapFrequency,
      ...dfProps
   })
   .then(_setConfigs)
   .catch(err => {
      _setConfigs({
         errMsg: err.message
      })
   })
 };

const _crLoadingState = () => ({
  isLoading: true,
  isLoadFailed: false
});

const _useIsLoadDims = (
  props,
  isLoadFailed
) => {
  const _hasBeenOpen = useHasBeenOpen(props.isShow);
  return isLoadFailed && _hasBeenOpen;
};

const _crDateOptions = (
  configs,
  _mF,
  mapDateDf,
  loadId
) => {
  const {dateOptions} = configs;
  if (dateOptions) {
    return [
      dateOptions,
      dateOptions[0]
    ];
  }

  const [
    _dateOptions,
    dateDefault
  ] = crDateConfig(_mF, mapDateDf, loadId);
  return [
    _dateOptions,
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

const useLoadDims = (
  props,
  setValidationMessages
) => {
  const {
    chartsType,
    mapFrequency,
    mapDateDf,
    loadId,
    dfProps={}
  } = props
  , _mapFrequency = dfProps.mapFrequency
     || mapFrequency
     || MAP_FREQUENCY_DF
  , _mapDateDf = dfProps.mapDateDf
     || mapDateDf
  , [{
       isLoading,
       isLoadFailed
     },
     setLoad
   ] = useState(_crLoadingState)
  , [
    state,
    setState
  ] = useState(()=>({
     configs: [],
     selectOptions: [],
     mapFrequency,
     chartOptions: crDialogChartOptions(props),
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
        ] = _crDateOptions(configs, _mF, _mapDateDf, loadId);
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
         chartOptions: crDialogChartOptions({ configs, chartsType, mapFrequency: _mF }),
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
   }, [chartsType, _mapFrequency, _mapDateDf, loadId, setValidationMessages])
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
    isLoadFailed
  ];
};

export default useLoadDims
