"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _createrFns = _interopRequireDefault(require("./createrFns"));

var crCaption = _createrFns["default"].crCaption,
    crItemKey = _createrFns["default"].crItemKey,
    crAlertConf = _createrFns["default"].crAlertConf;
var TYPE = 'selectN';
var TABLE_ID = 'table';

var _findItemTable = function _findItemTable(items) {
  var tableItem, tableIndex;

  for (var i = 0; i < items.length; i++) {
    if ((items == null ? void 0 : items[i].id) === TABLE_ID) {
      tableItem = items[i];
      tableIndex = i;
      break;
    }
  }

  return {
    tableItem: tableItem,
    tableIndex: tableIndex
  };
};

var _modifyIfItemTable = function _modifyIfItemTable(dfProps, items) {
  var _findItemTable2 = _findItemTable(items),
      tableItem = _findItemTable2.tableItem,
      tableIndex = _findItemTable2.tableIndex;

  if (tableItem) {
    var value = tableItem.value,
        dfTail = tableItem.dfTail;

    if (value && dfTail) {
      Object.assign(dfProps, {
        dfTable: value,
        dfTail: dfTail
      });
      items.splice(tableIndex, 1);
    }
  }
};

var createLoadOptions = function createLoadOptions(props, options) {
  if (props === void 0) {
    props = {};
  }

  if (options === void 0) {
    options = {};
  }

  var _props = props,
      loadId = _props.loadId,
      dataSource = _props.dataSource,
      _props$dfProps = _props.dfProps,
      dfProps = _props$dfProps === void 0 ? {} : _props$dfProps,
      _options = options,
      _options$items = _options.items,
      items = _options$items === void 0 ? [] : _options$items,
      titles = _options.titles,
      dialogOptions = _options.dialogOptions,
      _options$chartType = _options.chartType,
      chartType = _options$chartType === void 0 ? {} : _options$chartType,
      seriaColor = _options.seriaColor,
      seriaWidth = _options.seriaWidth,
      date = _options.date,
      _crCaption = crCaption(items, titles),
      itemCaption = _crCaption.itemCaption,
      threeC = _crCaption.threeC,
      title = _crCaption.title,
      subtitle = _crCaption.subtitle,
      seriaType = chartType.value,
      compType = chartType.compType,
      _itemKey = crItemKey(items, seriaType, date);

  _modifyIfItemTable(dfProps, items);

  return (0, _extends2["default"])({}, dfProps, {}, dialogOptions, {
    _type: TYPE,
    _itemKey: _itemKey,
    itemCaption: itemCaption,
    zhCompType: compType,
    time: date,
    seriaType: seriaType,
    seriaColor: seriaColor,
    seriaWidth: seriaWidth,
    items: items,
    loadId: loadId,
    title: title,
    subtitle: subtitle
  }, crAlertConf(itemCaption + ": " + threeC, itemCaption, threeC), {
    dataSource: dataSource
  });
};

var _default = createLoadOptions;
exports["default"] = _default;
//# sourceMappingURL=selectN.js.map