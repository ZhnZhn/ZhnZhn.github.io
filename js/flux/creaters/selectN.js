"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _createrFns = _interopRequireDefault(require("./createrFns"));

const {
  crCaption,
  crItemKey,
  crAlertConf
} = _createrFns.default;
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

  return {
    tableItem,
    tableIndex
  };
};

const _modifyIfItemTable = (_dfProps, items) => {
  const {
    tableItem,
    tableIndex
  } = _findItemTable(items);

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

const createLoadOptions = (props = {}, options = {}) => {
  const {
    loadId,
    linkFn,
    dataSource,
    dfProps = {}
  } = props,
        {
    items = [],
    titles,
    dialogOptions,
    chartType = {},
    seriaColor,
    seriaWidth,
    fromDate,
    date
  } = options,
        {
    itemCaption,
    threeC,
    title,
    subtitle
  } = crCaption(items, titles),
        {
    value: seriaType,
    compType
  } = chartType,
        _itemKey = crItemKey(items, seriaType, date, fromDate),
        _dfProps = { ...dfProps
  };

  _modifyIfItemTable(_dfProps, items);

  return { ..._dfProps,
    ...dialogOptions,
    _type: TYPE,
    _itemKey: _itemKey,
    itemCaption,
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
    ...crAlertConf(itemCaption + ": " + threeC, itemCaption, threeC),
    dataSource
  };
};

var _default = createLoadOptions;
exports.default = _default;
//# sourceMappingURL=selectN.js.map