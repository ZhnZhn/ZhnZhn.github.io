
const _isThreeTable = (dfProps, _items, metric) => {
  if (dfProps.dfT !== 'three') {
    _items.push(metric)
  } else {
    Object.assign(dfProps, {
      dfTable: metric.value,
      dfTail: metric.dfTail
    })    
  }
};

const _isDfParams = (dfProps, groupV, metricV) => {
  if (!dfProps.dfParams) {
    Object.assign(dfProps, {
      dfParams: [ "geo" ],
      dfTable: groupV,
      dfTail: metricV
    })
  }
};

const createLoadOptions = (props={}, options={}) => {
  const { loadId, dataSource, dfProps={} } = props
      , {
          one={}, group={}, metric={},
          chartType={}, seriaColor,
          date={}, dateDefault=''
        } = options
      , { caption:oneC='', value:oneV } = one
      , { caption:groupC='', value:groupV } = group
      , { caption:metricC='', value:metricV } = metric
      , { value:seriaType } = chartType
      , _time = date.value || dateDefault
      , _items = [ one, group ];

  _isThreeTable(dfProps, _items, metric)
  _isDfParams(dfProps, groupV, metricV)


  return {
    ...dfProps,
    geo : oneV,
    group : groupV,
    metric : metricV,
    seriaType : seriaType,
    seriaColor : seriaColor,
    //items: [ one, group, metric ],
    items: _items,
    time: _time,
    loadId : loadId,
    itemCaption: oneC,
    title : oneC,
    subtitle : `${groupC}: ${metricC}`,
    alertItemId : `${oneC}: ${metricC}`,
    alertGeo : oneC,
    alertMetric : metricC,
    dataSource
  }
};

export default createLoadOptions
