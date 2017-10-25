
const createLoadOptions = (props={}, options={}) => {
  const { loadId, dataSource } = props
      , { one={}, group={}, metric={}} = options
      , { caption:oneC='', value:oneV } = one
      , { caption:groupC='', value:groupV } = group
      , { caption:metricC='', value:metricV } = metric
  return {
    geo : oneV,
    group : groupV,
    metric : metricV,
    loadId : loadId,
    itemCaption: oneC,
    title : oneC,
    subtitle : `${groupC}:${metricC}`,
    alertItemId : `${oneC}:${metricC}`,
    alertGeo : oneC,
    alertMetric : metricC,
    dataSource
  }
};

export default createLoadOptions
