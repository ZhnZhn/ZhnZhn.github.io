
import EuroStatFn from '../../adapters/eurostat/EuroStatFn';

const COUNTRY_CAPTION_DF = 'EU'
    , AREA = 'AREA'

const createLoadOptions = (props={}, options={}) => {
  const { loadId, group } = props
      , { one, two={}, chartType={}, date, dateDefault } = options
      , { value:chartTypeValue='AREA' } = chartType

      , _countryValue = (one)
          ? one.value
          : COUNTRY_CAPTION_DF
      , _countryCaption = (one)
          ? one.caption
          : COUNTRY_CAPTION_DF

  let _zhCompType = undefined
  , _time = undefined
  , _mapValue = two.mapValue
  , _mapSlice = two.mapSlice;
  
  if (chartType && chartType.value !== AREA){
    _zhCompType = chartType.compType;
    _time = (date) ? date.value : dateDefault;

    if (!_mapValue) { _mapValue = EuroStatFn.createMapValue(props, two); }
    if (!_mapSlice) { _mapSlice = EuroStatFn.createMapSlice(props, two); }
  }

  return {
    geo : _countryValue,
    group : group,
    metric : two.value,
    loadId : loadId,
    itemCaption: _countryCaption,
    title : _countryCaption,
    subtitle : two.caption,
    alertItemId : `${_countryCaption}:${two.caption}`,
    alertGeo : _countryCaption,
    alertMetric : two.caption,
    seriaType : chartTypeValue,
    zhCompType : _zhCompType,
    mapValue : _mapValue,
    zhMapSlice : { ..._mapSlice, time : _time },
    time : _time
  }
};

export default createLoadOptions
