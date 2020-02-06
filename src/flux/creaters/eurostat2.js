
const DF_CAPTION = 'EU';

const createLoadOptions = (props={}, options={}) => {
  const {
          loadId, dataSource,
          dfProps={}
        } = props
      , {
          one, two={}, dialogOptions,
          chartType={},
          seriaColor, seriaWidth,
          date,
          selectOptions
        } = options
      , {
          value:_seriaType,
          compType:_zhCompType
        } = chartType
      , _oneV = one
           ? one.value
           : DF_CAPTION
      , _oneC = one
           ? one.caption
           : dfProps.dfSliceTitle || DF_CAPTION;

  return {
    ...dfProps,
    ...dialogOptions,
    itemMap: two,
    geo: _oneV,
    metric: two.value,
    loadId: loadId,
    itemCaption: _oneC,
    title: _oneC,
    subtitle: two.caption,
    alertItemId: `${_oneC}:${two.caption}`,
    alertGeo: _oneC,
    alertMetric: two.caption,
    seriaType: _seriaType,
    seriaColor, seriaWidth,
    zhCompType: _zhCompType,
    time: date,
    dataSource,
    items: [ one, two ],
    selectOptions
  }
};

export default createLoadOptions
