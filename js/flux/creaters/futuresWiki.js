"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var createLoadOptions = function createLoadOptions(props, options) {
  if (props === void 0) {
    props = {};
  }

  if (options === void 0) {
    options = {};
  }

  var _props = props,
      fnValue = _props.fnValue,
      columnName = _props.columnName,
      dataColumn = _props.dataColumn,
      seriaColumnNames = _props.seriaColumnNames,
      loadId = _props.loadId,
      dataSource = _props.dataSource,
      _options = options,
      exchange = _options.exchange,
      item = _options.item,
      type = _options.type,
      fromDate = _options.fromDate,
      _value = typeof fnValue === 'function' ? fnValue(exchange.value, item.value, type.value) : undefined,
      _subtitle = columnName ? type.caption + ":" + columnName : "" + type.caption;

  return {
    value: _value,
    title: exchange.caption + ":" + item.caption,
    subtitle: _subtitle,
    columnName: columnName,
    seriaColumnNames: seriaColumnNames,
    dataColumn: dataColumn,
    loadId: loadId,
    fromDate: fromDate,
    dataSource: dataSource
  };
};

var _default = createLoadOptions;
exports["default"] = _default;
//# sourceMappingURL=futuresWiki.js.map