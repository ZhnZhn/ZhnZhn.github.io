
const TYPE = 'selectN';
const _getCaption = item => item && item.caption || '';

const _crC = (title, subtitle) => ({
  title, subtitle
});
const _crCaption = (oneC, twoC, threeC, fourC) => {
  if (fourC) return _crC(`${oneC}: ${twoC}`, `${threeC}: ${fourC}`);
  if (threeC) return _crC(oneC, `${twoC}: ${threeC}`);
  if (twoC) return _crC(oneC, twoC );
  return _crC(oneC);
};

const _crItemKey = (items, seriaType, date) => {
  const _prefix = items
    .filter(Boolean)
    .map(item => item.value)
    .join('_');
  return `${_prefix}_${seriaType}_${date}`;
};

const createLoadOptions = (props={}, options={}) => {
  const { loadId, dataSource, dfProps={} } = props
      , {
          items=[],
          dialogOptions,
          chartType={},
          seriaColor,
          date
        } = options
      , oneC = _getCaption(items[0])
      , twoC = _getCaption(items[1])
      , threeC = _getCaption(items[2])
      , fourC = _getCaption(items[3])
      , { value:seriaType, compType } = chartType
      , { title, subtitle } = _crCaption(oneC, twoC, threeC, fourC)
      , _itemKey = _crItemKey(items, seriaType, date);

  return {
    ...dfProps,
    ...dialogOptions,
    _type: TYPE,
    _itemKey: _itemKey,
    seriaType: seriaType,
    seriaColor: seriaColor,
    zhCompType: compType,
    items: items,
    time: date,
    loadId: loadId,
    itemCaption: oneC,
    title: title,
    subtitle: subtitle,
    alertItemId: `${oneC}: ${threeC}`,
    alertGeo: oneC,
    alertMetric: threeC,
    dataSource
  }
};

export default createLoadOptions
