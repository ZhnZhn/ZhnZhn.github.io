'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TYPE = 'selectN';
var _getCaption = function _getCaption(item) {
  return item && item.caption || '';
};

var _crC = function _crC(title, subtitle) {
  return {
    title: title, subtitle: subtitle
  };
};
var _crCaption = function _crCaption(oneC, twoC, threeC, fourC) {
  if (fourC) return _crC(oneC + ': ' + twoC, threeC + ': ' + fourC);
  if (threeC) return _crC(oneC, twoC + ': ' + threeC);
  if (twoC) return _crC(oneC, twoC);
  return _crC(oneC);
};

var _crItemKey = function _crItemKey(items, seriaType, date) {
  var _prefix = items.filter(Boolean).map(function (item) {
    return item.value;
  }).join('_');
  return _prefix + '_' + seriaType + '_' + date;
};

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
      oneC = _getCaption(items[0]),
      twoC = _getCaption(items[1]),
      threeC = _getCaption(items[2]),
      fourC = _getCaption(items[3]),
      seriaType = chartType.value,
      compType = chartType.compType,
      _crCaption2 = _crCaption(oneC, twoC, threeC, fourC),
      title = _crCaption2.title,
      subtitle = _crCaption2.subtitle,
      _itemKey = _crItemKey(items, seriaType, date);

  return (0, _extends3.default)({}, dfProps, dialogOptions, {
    _type: TYPE,
    _itemKey: _itemKey,
    seriaType: seriaType,
    seriaColor: seriaColor,
    zhCompType: compType,
    items: items,
    time: date,
    loadId: loadId,
    itemCaption: oneC,
    title: title,
    subtitle: subtitle,
    alertItemId: oneC + ': ' + threeC,
    alertGeo: oneC,
    alertMetric: threeC,
    dataSource: dataSource
  });
};

exports.default = createLoadOptions;
//# sourceMappingURL=selectN.js.map