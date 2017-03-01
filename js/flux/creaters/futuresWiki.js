'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _is = require('../../utils/is');

var createLoadOptions = function createLoadOptions() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var fnValue = props.fnValue,
      columnName = props.columnName,
      dataColumn = props.dataColumn,
      seriaColumnNames = props.seriaColumnNames,
      loadId = props.loadId,
      exchange = options.exchange,
      item = options.item,
      type = options.type,
      fromDate = options.fromDate,
      _value = (0, _is.isFn)(fnValue) ? fnValue(exchange.value, item.value, type.value) : undefined,
      _subtitle = columnName ? type.caption + ':' + columnName : '' + type.caption;

  return {
    value: _value,
    title: exchange.caption + ':' + item.caption,
    subtitle: _subtitle,
    columnName: columnName,
    seriaColumnNames: seriaColumnNames,
    dataColumn: dataColumn,
    loadId: loadId,
    fromDate: fromDate
  };
};

exports.default = createLoadOptions;
//# sourceMappingURL=futuresWiki.js.map