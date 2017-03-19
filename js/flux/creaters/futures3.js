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
      dataSource = props.dataSource,
      item = options.item,
      month = options.month,
      year = options.year,
      fromDate = options.fromDate,
      _value = (0, _is.isFn)(fnValue) ? fnValue(item.value, month.value, year.value) : undefined,
      _subtitle = columnName ? month.caption + ':' + year.caption + ':' + columnName : month.caption + ':' + year.caption;

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

exports.default = createLoadOptions;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\creaters\futures3.js.map