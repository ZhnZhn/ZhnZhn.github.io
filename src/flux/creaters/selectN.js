
const createLoadOptions = (props={}, options={}) => {
  const { loadId, dataSource, dfProps={} } = props
      , {
          items=[],
          chartType={},
          seriaColor,
          date={}, dateDefault=''
        } = options
      , { caption:oneC='' } = items[0] || {}
      , { caption:twoC='' } = items[1] || {}
      , { caption:threeC='' } = items[2] || {}
      , { value:seriaType, compType } = chartType
      ,  _time = date.value || dateDefault;
  
  return {
    ...dfProps,
    seriaType: seriaType,
    seriaColor: seriaColor,
    zhCompType: compType,
    items: items,
    time: _time,
    loadId: loadId,
    itemCaption: oneC,
    title: oneC,
    subtitle: `${twoC}: ${threeC}`,
    alertItemId: `${oneC}: ${threeC}`,
    alertGeo: oneC,
    alertMetric: threeC,
    dataSource
  }
};

export default createLoadOptions
