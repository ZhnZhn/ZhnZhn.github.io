'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _crDefault = function _crDefault(props, options) {
  var isPremium = props.isPremium,
      fnValue = props.fnValue,
      loadId = props.loadId,
      dataSource = props.dataSource,
      _props$dfProps = props.dfProps,
      dfProps = _props$dfProps === undefined ? {} : _props$dfProps,
      one = options.one,
      two = options.two,
      three = options.three,
      fromDate = options.fromDate,
      toDate = options.toDate,
      hasSecondYAxis = options.hasSecondYAxis,
      seriaType = options.seriaType,
      _value = typeof fnValue === 'function' ? fnValue(one.value, two.value) : undefined;

  return (0, _extends3.default)({}, dfProps, {
    value: _value,
    title: one.caption + ': ' + two.caption,
    subtitle: three.caption,
    oneCaption: one.caption,
    one: one.value,
    two: two.value,
    three: three.value,
    fromDate: fromDate, toDate: toDate,
    dataColumn: three ? three.value : 1,
    loadId: loadId,
    dataSource: dataSource, isPremium: isPremium,
    hasSecondYAxis: hasSecondYAxis, seriaType: seriaType
  });
};

var _crType5A = function _crType5A(props, option) {
  var r = _crDefault(props, option),
      one = option.one,
      two = option.two,
      three = option.three,
      fnValue = props.fnValue,
      _props$dataColumn = props.dataColumn,
      dataColumn = _props$dataColumn === undefined ? 1 : _props$dataColumn,
      value = typeof fnValue === 'function' ? fnValue(one.value, two.value, three.value) : undefined;


  Object.assign(r, { dataColumn: dataColumn, value: value });
  return r;
};

var _crTreeItem = function _crTreeItem(props, options) {
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
      _value = typeof fnValue === 'function' ? fnValue(one.value, three.value) : undefined;

  return {
    value: _value,
    title: one.caption + ':' + two.caption,
    subtitle: three.caption,
    fromDate: fromDate, toDate: toDate,
    dataColumn: dataColumn, loadId: loadId,
    dataSource: dataSource, isPremium: isPremium,
    hasSecondYAxis: hasSecondYAxis, seriaType: seriaType
  };
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
      _value = typeof fnValue === 'function' ? fnValue(one.value, two.value, three.value) : undefined;

  return {
    value: _value,
    title: two.caption + ' : ' + three.caption,
    subtitle: one.caption,
    fromDate: fromDate, toDate: toDate,
    dataColumn: dataColumn, loadId: loadId,
    dataSource: dataSource, isPremium: isPremium,
    hasSecondYAxis: hasSecondYAxis, seriaType: seriaType
  };
};

var _rFn = {
  DEFAULT: _crDefault,
  TreeItem: _crTreeItem,
  PlusTreeItem: _crPlusTreeItem,
  Type5A: _crType5A
};

var createLoadOptions = function createLoadOptions() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var fnValueType = props.fnValueType,
      _createLoadOption = _rFn[fnValueType];

  if (typeof _createLoadOption === 'function') {
    return _createLoadOption(props, options);
  } else {
    return _rFn.DEFAULT(props, options);
  }
};

exports.default = createLoadOptions;
//# sourceMappingURL=type5.js.map