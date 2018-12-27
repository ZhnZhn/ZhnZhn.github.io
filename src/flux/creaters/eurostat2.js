
const DF_CAPTION = 'EU';

const createLoadOptions = (props={}, options={}) => {
  const {
          loadId, dataSource,
          dfProps={}
        } = props
      , {
          one, two={}, chartType={},
          seriaColor,
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
    seriaColor: seriaColor,
    zhCompType: _zhCompType,
    time: date,
    dataSource,
    items: [ one, two ],
    selectOptions
  }
};

export default createLoadOptions
