import fns from './createrFns'

const { crCaption, crItemKey } = fns;

const COUNTRY_CAPTION_DF = 'EU';

const _toIds = ({ dfId }, items) => {
  const _arr = [dfId];  
  items.forEach(({ slice }) => {
    if (slice) {
      _arr.push(slice[Object.keys(slice)[0]])
    }
  })
  return _arr;
};

const createLoadOptions = (props={}, options={}) => {
  const { loadId, group, dataSource, dfProps, timeId } = props
      , {
          items=[],
          chartType={}, seriaColor,
          date, dateDefault,
          selectOptions
        } = options
      , { value:seriaType, compType: zhCompType } = chartType
      , _countryValue = items[0]
          ? items[0].value
          : COUNTRY_CAPTION_DF
      , twoV = items[1] ? items[1].value: undefined
      , { oneC, title, subtitle } = crCaption(items)
      , time = date ? date.value : dateDefault
      , _items = _toIds(dfProps, items)
      , _itemKey = crItemKey(_items, seriaType, time);

  return {
    ...dfProps,
    _itemKey,
    geo : _countryValue,
    group : group,
    metric : twoV,
    itemCaption: oneC,
    alertGeo : oneC,
    loadId,
    title, subtitle,
    seriaType, seriaColor,
    zhCompType,
    time, timeId,
    dataSource,
    items,
    selectOptions
  }
};

export default createLoadOptions
