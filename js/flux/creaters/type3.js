"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _createrFns = _interopRequireDefault(require("./createrFns"));

var getC = _createrFns["default"].getC,
    getV = _createrFns["default"].getV;

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var createLoadOptions = function createLoadOptions(props, options) {
  if (props === void 0) {
    props = {};
  }

  if (options === void 0) {
    options = {};
  }

  var _props = props,
      columnName = _props.columnName,
      dataColumn = _props.dataColumn,
      seriaColumnNames = _props.seriaColumnNames,
      loadId = _props.loadId,
      fnValue = _props.fnValue,
      fnItemCaption = _props.fnItemCaption,
      linkFn = _props.linkFn,
      dataSource = _props.dataSource,
      dfProps = _props.dfProps,
      _options = options,
      one = _options.one,
      fromDate = _options.fromDate,
      toDate = _options.toDate,
      transform = _options.transform,
      _options$chartType = _options.chartType,
      chartType = _options$chartType === void 0 ? {} : _options$chartType,
      seriaColor = _options.seriaColor,
      seriaWidth = _options.seriaWidth,
      seriaType = chartType.value,
      value = getV(one),
      caption = getC(one),
      _value = _isFn(fnValue) ? fnValue(value) : value,
      _itemCaption = _isFn(fnItemCaption) ? fnItemCaption(value) : void 0,
      _transform = transform ? transform.value : void 0,
      _subtitle = transform ? transform.caption : void 0;

  return (0, _extends2["default"])({
    value: _value,
    transform: _transform,
    title: caption,
    subtitle: _subtitle,
    item: one,
    oneCaption: caption,
    fromDate: fromDate,
    toDate: toDate,
    columnName: columnName,
    dataColumn: dataColumn,
    itemCaption: _itemCaption,
    loadId: loadId,
    linkFn: linkFn,
    seriaType: seriaType,
    seriaColor: seriaColor,
    seriaWidth: seriaWidth,
    seriaColumnNames: seriaColumnNames,
    dataSource: dataSource
  }, dfProps);
};

var _default = createLoadOptions;
exports["default"] = _default;
//# sourceMappingURL=type3.js.map