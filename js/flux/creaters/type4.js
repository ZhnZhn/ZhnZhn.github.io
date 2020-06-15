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
      fnValue = _props.fnValue,
      dataColumn = _props.dataColumn,
      loadId = _props.loadId,
      dataSource = _props.dataSource,
      isPremium = _props.isPremium,
      linkFn = _props.linkFn,
      _props$dfProps = _props.dfProps,
      dfProps = _props$dfProps === void 0 ? {} : _props$dfProps,
      _options = options,
      one = _options.one,
      two = _options.two,
      _options$three = _options.three,
      three = _options$three === void 0 ? {} : _options$three,
      fromDate = _options.fromDate,
      toDate = _options.toDate,
      hasSecondYAxis = _options.hasSecondYAxis,
      _oneV = getV(one),
      _oneC = getC(one),
      _twoV = getV(two),
      _twoC = getC(two),
      _threeV = getV(three),
      _threeC = getC(three),
      _value = _isFn(fnValue) ? fnValue(_oneV, _twoV) : _oneV;

  return (0, _extends2["default"])({}, dfProps, {
    value: _value,
    fromDate: fromDate,
    toDate: toDate,
    dataColumn: dataColumn,
    loadId: loadId,
    title: _oneC,
    subtitle: _twoC,
    isPremium: isPremium,
    dataSource: dataSource,
    hasSecondYAxis: hasSecondYAxis,
    linkFn: linkFn,
    oneCaption: _oneC,
    twoCaption: _twoC,
    threeCaption: _threeC,
    one: _oneV,
    two: _twoV,
    three: _threeV,
    items: [one, two, three]
  });
};

var _default = createLoadOptions;
exports["default"] = _default;
//# sourceMappingURL=type4.js.map