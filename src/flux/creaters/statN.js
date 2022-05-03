import {
  crCaption,
  crItemKey
} from './createrFns';

const _toIds = ({ dfId }, items) => {
  const _arr = [dfId];
  items.forEach(({ slice, value }={}) => {
    if (slice) {
      _arr.push(slice[Object.keys(slice)[0]])
    } else if (value) {
      //Eurostat case
      _arr.push(value)
    }
  })
  return _arr;
};

const createLoadOptions = (
  props,
  options
) => {
  const {
    loadId,
    dataSource,
    dfProps={}
  } = props || {}
  , {
      timeId,
      time,
      dfC,
      dfTitle,
      items=[],
      titles,
      dialogOptions,
      chartType,
      seriaColor,
      seriaWidth,
      selectOptions
    } = options || {}
  , { value:seriaType, compType: zhCompType } = chartType || {}
  , { itemCaption, title, subtitle } = crCaption(items, titles)
  , _items = _toIds(dfProps, items)
  , _itemKey = crItemKey(_items, seriaType, time);

  return {
    dfC,
    dfTitle,
    ...dfProps,
    ...dialogOptions,
    _itemKey,
    itemCaption: dfTitle || itemCaption,
    loadId,
    title, subtitle,
    seriaType, seriaColor, seriaWidth,
    zhCompType,
    time, timeId,
    dataSource,
    items,
    selectOptions
  };
};

export default createLoadOptions
