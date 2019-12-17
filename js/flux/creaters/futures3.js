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
      item = _options.item,
      month = _options.month,
      year = _options.year,
      fromDate = _options.fromDate,
      _value = typeof fnValue === 'function' ? fnValue(item.value, month.value, year.value) : undefined,
      _subtitle = columnName ? month.caption + ":" + year.caption + ":" + columnName : month.caption + ":" + year.caption;

  return {
    value: _value,
    title: item.caption,
    subtitle: _subtitle,
    columnName: columnName,
    dataColumn: dataColumn,
    loadId: loadId,
    fromDate: fromDate,
    seriaColumnNames: seriaColumnNames,
    dataSource: dataSource
  };
};

var _default = createLoadOptions;
exports["default"] = _default;
//# sourceMappingURL=futures3.js.map