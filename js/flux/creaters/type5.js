"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var _crTitle = function _crTitle(one, two) {
  return one.caption + ": " + two.caption;
};

var _crDefault = function _crDefault(props, options) {
  var isPremium = props.isPremium,
      fnValue = props.fnValue,
      loadId = props.loadId,
      dataSource = props.dataSource,
      dfProps = props.dfProps,
      one = options.one,
      two = options.two,
      three = options.three,
      fromDate = options.fromDate,
      toDate = options.toDate,
      hasSecondYAxis = options.hasSecondYAxis,
      seriaType = options.seriaType,
      _value = _isFn(fnValue) ? fnValue(one.value, two.value) : undefined;

  return (0, _extends2["default"])({}, dfProps, {
    value: _value,
    title: _crTitle(one, two),
    subtitle: three.caption,
    oneCaption: one.caption,
    one: one.value,
    two: two.value,
    three: three.value,
    fromDate: fromDate,
    toDate: toDate,
    dataColumn: three ? three.value : 1,
    loadId: loadId,
    dataSource: dataSource,
    isPremium: isPremium,
    hasSecondYAxis: hasSecondYAxis,
    seriaType: seriaType
  });
};

var _crType5A = function _crType5A(props, option) {
  var r = _crDefault(props, option),
      one = option.one,
      two = option.two,
      three = option.three,
      fnValue = props.fnValue,
      _props$dataColumn = props.dataColumn,
      dataColumn = _props$dataColumn === void 0 ? 1 : _props$dataColumn,
      value = _isFn(fnValue) ? fnValue(one.value, two.value, three.value) : undefined;

  Object.assign(r, {
    dataColumn: dataColumn,
    value: value
  });
  return r;
};

var _crTreeItem = function _crTreeItem(props, options) {
  var isPremium = props.isPremium,
      fnValue = props.fnValue,
      dataColumn = props.dataColumn,
      loadId = props.loadId,
      dataSource = props.dataSource,
      dfProps = props.dfProps,
      one = options.one,
      two = options.two,
      three = options.three,
      fromDate = options.fromDate,
      toDate = options.toDate,
      hasSecondYAxis = options.hasSecondYAxis,
      seriaType = options.seriaType,
      _value = _isFn(fnValue) ? fnValue(one.value, three.value) : undefined;

  return (0, _extends2["default"])({}, dfProps, {
    value: _value,
    title: _crTitle(one, two),
    subtitle: three.caption,
    fromDate: fromDate,
    toDate: toDate,
    dataColumn: dataColumn,
    loadId: loadId,
    dataSource: dataSource,
    isPremium: isPremium,
    hasSecondYAxis: hasSecondYAxis,
    seriaType: seriaType
  });
};

var _crPlusTreeItem = function _crPlusTreeItem(props, options) {
  var isPremium = props.isPremium,
      fnValue = props.fnValue,
      dataColumn = props.dataColumn,
      loadId = props.loadId,
      dataSource = props.dataSource,
      one = options.one,
      two = options.two,
      three = options.three,
      fromDate = options.fromDate,
      toDate = options.toDate,
      hasSecondYAxis = options.hasSecondYAxis,
      seriaType = options.seriaType,
      _value = _isFn(fnValue) ? fnValue(one.value, two.value, three.value) : undefined;

  return {
    value: _value,
    title: _crTitle(two, three),
    subtitle: one.caption,
    fromDate: fromDate,
    toDate: toDate,
    dataColumn: dataColumn,
    loadId: loadId,
    dataSource: dataSource,
    isPremium: isPremium,
    hasSecondYAxis: hasSecondYAxis,
    seriaType: seriaType
  };
};

var _rFn = {
  DF: _crDefault,
  TreeItem: _crTreeItem,
  PlusTreeItem: _crPlusTreeItem,
  Type5A: _crType5A
};

var createLoadOptions = function createLoadOptions(props, options) {
  if (props === void 0) {
    props = {};
  }

  if (options === void 0) {
    options = {};
  }

  var _props = props,
      fnValueType = _props.fnValueType,
      _createLoadOption = _rFn[fnValueType];
  return _isFn(_createLoadOption) ? _createLoadOption(props, options) : _rFn.DF(props, options);
};

var _default = createLoadOptions;
exports["default"] = _default;
//# sourceMappingURL=type5.js.map