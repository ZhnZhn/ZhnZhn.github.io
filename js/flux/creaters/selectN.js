"use strict";

exports.__esModule = true;
exports.default = void 0;
var _arrFn = require("../../utils/arrFn");
var _createrFns = require("./createrFns");
const TYPE = 'selectN';
const TABLE_ID = 'table';
const _assign = Object.assign;
const _findItemTable = items => {
  let tableItem, tableIndex, _item;
  for (let i = 0; i < items.length; i++) {
    _item = items[i];
    if (_item && _item.id === TABLE_ID) {
      tableItem = items[i];
      tableIndex = i;
      break;
    }
  }
  return [tableItem, tableIndex];
};
const _modifyIfItemTable = (_dfProps, items) => {
  const [tableItem, tableIndex] = _findItemTable(items);
  if (tableItem) {
    const {
      v: dfTable,
      dfTail,
      mapFrequency
    } = tableItem;
    if (dfTable) {
      _assign(_dfProps, {
        dfTable,
        dfTail
      });
      if (mapFrequency) {
        _dfProps.mapFrequency = mapFrequency;
      }
      items.splice(tableIndex, 1);
    }
  }
};
const createLoadOptions = (props, options) => {
  const {
      loadId,
      linkFn,
      dataSource,
      dfProps
    } = props || {},
    {
      items = [],
      titles,
      dialogOptions,
      chartType,
      seriaColor,
      seriaWidth,
      fromDate,
      date,
      _rt
    } = options || {},
    [itemCaption, title, subtitle, threeC] = (0, _createrFns.crCaptions)(items, titles),
    {
      value: seriaType,
      compType,
      cId
    } = chartType || {},
    _itemKey = (0, _createrFns.crItemKey)(items, seriaType, date, fromDate),
    _dfProps = {
      ...dfProps
    };
  _modifyIfItemTable(_dfProps, items);
  return {
    dfC: cId,
    ..._dfProps,
    ...dialogOptions,
    _type: TYPE,
    _itemKey: _itemKey,
    _rt: (0, _createrFns.crRoundTo)(_rt),
    itemCaption,
    alertItemId: (0, _arrFn.joinByColon)(itemCaption, threeC),
    zhCompType: compType,
    fromDate,
    time: date,
    seriaType,
    seriaColor,
    seriaWidth,
    items,
    loadId,
    linkFn,
    title,
    subtitle,
    dataSource
  };
};
var _default = exports.default = createLoadOptions;
//# sourceMappingURL=selectN.js.map