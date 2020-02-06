import fns from './createrFns'

const { crCaption, crItemKey, crAlertConf } = fns;

const TYPE = 'selectN';

const createLoadOptions = (props={}, options={}) => {
  const { loadId, dataSource, dfProps={} } = props
  , {
      items=[], titles,
      dialogOptions,
      chartType={},
      seriaColor,
      seriaWidth,
      date
    } = options
  , {
      itemCaption, threeC,
      title, subtitle
    } = crCaption(items, titles)
  , { value:seriaType, compType } = chartType
  , _itemKey = crItemKey(items, seriaType, date);

  return {
    ...dfProps,
    ...dialogOptions,
    _type: TYPE,
    _itemKey: _itemKey,
    itemCaption,
    zhCompType: compType,
    time: date,
    seriaType, seriaColor, seriaWidth,
    items, loadId,
    title, subtitle,
    ...crAlertConf(`${itemCaption}: ${threeC}`, itemCaption, threeC),
    dataSource
  }
};

export default createLoadOptions
