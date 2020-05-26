import fns from './createrFns'

const { crCaption, crItemKey, crAlertConf } = fns;

const TYPE = 'selectN';
const TABLE_ID = 'table';

const _findItemTable = (items) => {
  let tableItem, tableIndex;
  for (let i=0; i<items.length;i++){
    if (items?.[i].id === TABLE_ID) {
      tableItem = items[i];
      tableIndex = i;
      break;
    }
  }
  return { tableItem, tableIndex };
};

const _modifyIfItemTable = (dfProps, items) => {
  const { tableItem, tableIndex } = _findItemTable(items);
  if (tableItem) {
    const { value, dfTail, mapFrequency } = tableItem;
    if (value) {
      Object.assign(dfProps, {
        dfTable: value, dfTail
      })
      if (mapFrequency) {
        dfProps.mapFrequency = mapFrequency
      }
      items.splice(tableIndex, 1);
    }
  }
};

const createLoadOptions = (props={}, options={}) => {
  const { loadId, dataSource, dfProps={} } = props
  , {
      items=[], titles,
      dialogOptions,
      chartType={},
      seriaColor,
      seriaWidth,
      fromDate,
      date
    } = options
  , {
      itemCaption, threeC,
      title, subtitle
    } = crCaption(items, titles)
  , { value:seriaType, compType } = chartType
  , _itemKey = crItemKey(items, seriaType, date);

  _modifyIfItemTable(dfProps, items)

  return {
    ...dfProps,
    ...dialogOptions,
    _type: TYPE,
    _itemKey: _itemKey,
    itemCaption,
    zhCompType: compType,
    fromDate,
    time: date,
    seriaType, seriaColor, seriaWidth,
    items, loadId,
    title, subtitle,
    ...crAlertConf(`${itemCaption}: ${threeC}`, itemCaption, threeC),
    dataSource
  }
};

export default createLoadOptions
