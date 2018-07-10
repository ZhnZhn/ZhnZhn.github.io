
const COUNTRY_CAPTION_DF = 'EU';
  //  , AREA = 'AREA';

const createLoadOptions = (props={}, options={}) => {
  const { loadId, group, dataSource, dfProps } = props
      , {
          items,
          chartType={}, seriaColor,
          date, dateDefault,
          selectOptions
        } = options
      , { value:chartTypeValue } = chartType
      , _countryValue = items[0]
          ? items[0].value
          : COUNTRY_CAPTION_DF
      , _countryCaption = items[0]
          ? items[0].caption
          : COUNTRY_CAPTION_DF;


  const _zhCompType = chartType.compType
     , _time = (date) ? date.value : dateDefault;

  /*
  if (chartType && chartType.value !== AREA){
    _zhCompType = chartType.compType;
    _time = (date) ? date.value : dateDefault;
  }
  */

  return {
    ...dfProps,
    geo : _countryValue,
    group : group,
    metric : items[1] ? items[1].value: undefined,
    loadId : loadId,
    itemCaption: _countryCaption,
    title : _countryCaption,
    subtitle : items[1] ? items[1].caption: undefined,
    alertGeo : _countryCaption,
    seriaType : chartTypeValue,
    seriaColor : seriaColor,
    zhCompType : _zhCompType,
    time : _time,
    dataSource,
    items,
    selectOptions
  }
};

export default createLoadOptions
