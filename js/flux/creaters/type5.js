'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _is = require('../../utils/is');

var _crDefault = function _crDefault(props, options) {
  var fnValue = props.fnValue,
      loadId = props.loadId,
      dataSource = props.dataSource,
      one = options.one,
      two = options.two,
      three = options.three,
      fromDate = options.fromDate,
      toDate = options.toDate,
      _value = (0, _is.isFn)(fnValue) ? fnValue(one.value, two.value) : undefined;

  return {
    value: _value,
    fromDate: fromDate,
    toDate: toDate,
    dataColumn: three ? three.value : 1,
    loadId: loadId,
    title: one.caption + ':' + two.caption,
    subtitle: three.caption,
    dataSource: dataSource
  };
};

var _crTreeItem = function _crTreeItem(props, options) {
  var fnValue = props.fnValue,
      dataColumn = props.dataColumn,
      loadId = props.loadId,
      dataSource = props.dataSource,
      one = options.one,
      two = options.two,
      three = options.three,
      fromDate = options.fromDate,
      toDate = options.toDate,
      _value = (0, _is.isFn)(fnValue) ? fnValue(one.value, three.value) : undefined;

  return {
    value: _value,
    fromDate: fromDate,
    toDate: toDate,
    dataColumn: dataColumn,
    loadId: loadId,
    title: one.caption + ':' + two.caption,
    subtitle: three.caption,
    dataSource: dataSource
  };
};

var _crPlusTreeItem = function _crPlusTreeItem(props, options) {
  var fnValue = props.fnValue,
      dataColumn = props.dataColumn,
      loadId = props.loadId,
      dataSource = props.dataSource,
      one = options.one,
      two = options.two,
      three = options.three,
      fromDate = options.fromDate,
      toDate = options.toDate,
      _value = (0, _is.isFn)(fnValue) ? fnValue(one.value, two.value, three.value) : undefined;

  return {
    value: _value,
    fromDate: fromDate,
    toDate: toDate,
    dataColumn: dataColumn,
    loadId: loadId,
    title: two.caption + ' : ' + three.caption,
    subtitle: one.caption,
    dataSource: dataSource
  };
};

var _rFn = {
  DEFAULT: _crDefault,
  TreeItem: _crTreeItem,
  PlusTreeItem: _crPlusTreeItem
};

var createLoadOptions = function createLoadOptions() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var fnValueType = props.fnValueType,
      _createLoadOption = _rFn[fnValueType];

  if ((0, _is.isFn)(_createLoadOption)) {
    return _createLoadOption(props, options);
  } else {
    return _rFn.DEFAULT(props, options);
  }
};

exports.default = createLoadOptions;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\creaters\type5.js.map