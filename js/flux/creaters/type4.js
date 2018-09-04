'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createLoadOptions = function createLoadOptions() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var fnValue = props.fnValue,
      dataColumn = props.dataColumn,
      loadId = props.loadId,
      dataSource = props.dataSource,
      isPremium = props.isPremium,
      linkFn = props.linkFn,
      _props$dfProps = props.dfProps,
      dfProps = _props$dfProps === undefined ? {} : _props$dfProps,
      one = options.one,
      two = options.two,
      _options$three = options.three,
      three = _options$three === undefined ? {} : _options$three,
      fromDate = options.fromDate,
      toDate = options.toDate,
      hasSecondYAxis = options.hasSecondYAxis,
      _value = typeof fnValue === 'function' ? fnValue(one.value, two.value) : one.value;

  return (0, _extends3.default)({}, dfProps, {
    value: _value,
    fromDate: fromDate,
    toDate: toDate,
    dataColumn: dataColumn,
    loadId: loadId,
    title: one.caption,
    subtitle: two.caption,
    isPremium: isPremium,
    dataSource: dataSource,
    hasSecondYAxis: hasSecondYAxis,
    linkFn: linkFn,
    oneCaption: one.caption,
    twoCaption: two.caption,
    threeCaption: three.caption,
    one: one.value,
    two: two.value,
    three: three.value,
    items: [one, two, three]
  });
};

exports.default = createLoadOptions;
//# sourceMappingURL=type4.js.map