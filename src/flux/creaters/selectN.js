import fns from './createrFns'

const { crCaption, crItemKey, crAlertConf } = fns;

const TYPE = 'selectN';

const createLoadOptions = (props={}, options={}) => {
  const { loadId, dataSource, dfProps={} } = props
      , {
          items=[],
          dialogOptions,
          chartType={},
          seriaColor,
          date
        } = options
      , { oneC, threeC, title, subtitle } = crCaption(items)
      , { value:seriaType, compType } = chartType
      , _itemKey = crItemKey(items, seriaType, date);

  return {
    ...dfProps,
    ...dialogOptions,
    _type: TYPE,
    _itemKey: _itemKey,
    itemCaption: oneC,
    zhCompType: compType,
    time: date,
    seriaType, seriaColor,
    items, loadId,
    title, subtitle,
    ...crAlertConf(`${oneC}: ${threeC}`, oneC, threeC),
    dataSource
  }
};

export default createLoadOptions
