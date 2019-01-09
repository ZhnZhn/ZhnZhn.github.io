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

  var loadId = props.loadId,
      dataSource = props.dataSource,
      _props$dfProps = props.dfProps,
      dfProps = _props$dfProps === undefined ? {} : _props$dfProps,
      _options$items = options.items,
      items = _options$items === undefined ? [] : _options$items,
      dialogOptions = options.dialogOptions,
      _options$chartType = options.chartType,
      chartType = _options$chartType === undefined ? {} : _options$chartType,
      seriaColor = options.seriaColor,
      date = options.date,
      _ref = items[0] || {},
      _ref$caption = _ref.caption,
      oneC = _ref$caption === undefined ? '' : _ref$caption,
      _ref2 = items[1] || {},
      _ref2$caption = _ref2.caption,
      twoC = _ref2$caption === undefined ? '' : _ref2$caption,
      _ref3 = items[2] || {},
      _ref3$caption = _ref3.caption,
      threeC = _ref3$caption === undefined ? '' : _ref3$caption,
      seriaType = chartType.value,
      compType = chartType.compType;

  return (0, _extends3.default)({}, dfProps, dialogOptions, {
    seriaType: seriaType,
    seriaColor: seriaColor,
    zhCompType: compType,
    items: items,
    time: date,
    loadId: loadId,
    itemCaption: oneC,
    title: oneC,
    subtitle: twoC + ': ' + threeC,
    alertItemId: oneC + ': ' + threeC,
    alertGeo: oneC,
    alertMetric: threeC,
    dataSource: dataSource
  });
};

exports.default = createLoadOptions;
//# sourceMappingURL=selectN.js.map