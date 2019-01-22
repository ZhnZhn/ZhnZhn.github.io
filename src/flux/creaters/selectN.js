
const _getCaption = item => item && item.caption || '';

const createLoadOptions = (props={}, options={}) => {
  const { loadId, dataSource, dfProps={} } = props
      , {
          items=[],
          dialogOptions,
          chartType={},
          seriaColor,
          isCategory,
          date
        } = options
      , oneC = _getCaption(items[0])
      , twoC = _getCaption(items[1])
      , threeC = _getCaption(items[2])
      , fourC = _getCaption(items[3])
      , { value:seriaType, compType } = chartType
      , _title = isCategory ? twoC : oneC
      , _subtitle = isCategory
           ? `${threeC}: ${fourC}`
           : `${twoC}: ${threeC}`;

  return {
    ...dfProps,
    ...dialogOptions,
    seriaType: seriaType,
    seriaColor: seriaColor,
    zhCompType: compType,
    items: items,
    time: date,
    loadId: loadId,
    itemCaption: oneC,
    title: _title,
    subtitle: _subtitle,
    alertItemId: `${oneC}: ${threeC}`,
    alertGeo: oneC,
    alertMetric: threeC,
    dataSource
  }
};

export default createLoadOptions
