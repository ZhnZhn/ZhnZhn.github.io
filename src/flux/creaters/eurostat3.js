
const createLoadOptions = (props={}, options={}) => {
  const { loadId, dataSource, dfProps } = props
      , {
          one={}, group={}, metric={},
          chartType={},
          date={}, dateDefault=''
        } = options
      , { caption:oneC='', value:oneV } = one
      , { caption:groupC='', value:groupV } = group
      , { caption:metricC='', value:metricV } = metric
      , { value:chartTypeValue='AREA' } = chartType
      , _time = date.value || dateDefault;
  return {
    ...dfProps,
    geo : oneV,
    group : groupV,
    metric : metricV,
    time: _time,
    loadId : loadId,
    itemCaption: oneC,
    title : oneC,
    subtitle : `${groupC}:${metricC}`,
    alertItemId : `${oneC}:${metricC}`,
    alertGeo : oneC,
    alertMetric : metricC,
    seriaType : chartTypeValue,
    dataSource,
    items: [ one, group, metric ]
  }
};

export default createLoadOptions
