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
      loadId = _props.loadId,
      dataSource = _props.dataSource,
      isPremium = _props.isPremium,
      _options = options,
      country = _options.one,
      metric = _options.two,
      fromDate = _options.fromDate,
      toDate = _options.toDate,
      _value = typeof fnValue === 'function' ? fnValue(country.value) : undefined,
      _dataColumn = metric ? metric.value : 1,
      _subtitle = metric ? metric.caption : 'Local Price';

  return {
    viewKey: _value + '_' + _dataColumn,
    value: _value,
    fromDate: fromDate,
    toDate: toDate,
    dataColumn: _dataColumn,
    itemCaption: country.caption,
    loadId: loadId,
    title: country.caption,
    subtitle: _subtitle,
    dataSource: dataSource,
    isPremium: isPremium
  };
};

var _default = createLoadOptions;
exports["default"] = _default;
//# sourceMappingURL=bigMac.js.map