import {
  isCategoryItem
} from '../../components/dialogs/ChartOptionsFn';
import {
  crCaptions,
  crItemKey,
  crRoundTo
} from './createrFns';

const _getObjectKeys = Object.keys;

const _toIds = (
  { dfId },
  items
) => {
  const _arr = [dfId];
  items.forEach(({ slice, value }={}) => {
    if (slice) {
      _arr.push(slice[_getObjectKeys(slice)[0]])
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
      selectOptions,
      _rt
    } = options || {}
  , {
    value:seriaType,
    compType: zhCompType
  } = chartType || {}
  , [
    itemCaption,
    title,
    subtitle
  ] = crCaptions(items, titles)
  , _items = _toIds(dfProps, items)
  , _itemKey = crItemKey(_items, seriaType, time);

  return {
    dfC,
    dfTitle,
    ...dfProps,
    ...dialogOptions,
    _itemKey,
    _rt: crRoundTo(_rt),
    itemCaption: isCategoryItem(chartType)
       ? dfTitle || itemCaption
       : itemCaption,
    loadId,
    title,
    subtitle,
    seriaType,
    seriaColor,
    seriaWidth,
    zhCompType,
    time,
    timeId,
    dataSource,
    items,
    selectOptions
  };
};

export default createLoadOptions
