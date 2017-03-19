'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _is = require('../../utils/is');

var createLoadOptions = function createLoadOptions() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var fnValue = props.fnValue,
      dataColumn = props.dataColumn,
      loadId = props.loadId,
      dataSource = props.dataSource,
      isPremium = props.isPremium,
      one = options.one,
      two = options.two,
      fromDate = options.fromDate,
      toDate = options.toDate,
      _value = (0, _is.isFn)(fnValue) ? fnValue(one.value, two.value) : undefined;

  return {
    value: _value,
    fromDate: fromDate,
    toDate: toDate,
    dataColumn: dataColumn,
    loadId: loadId,
    title: one.caption,
    subtitle: two.caption,
    isPremium: isPremium,
    dataSource: dataSource
  };
};

exports.default = createLoadOptions;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\creaters\type4.js.map