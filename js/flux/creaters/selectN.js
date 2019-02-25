'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _createrFns = require('./createrFns');

var _createrFns2 = _interopRequireDefault(_createrFns);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var crCaption = _createrFns2.default.crCaption,
    crItemKey = _createrFns2.default.crItemKey,
    crAlertConf = _createrFns2.default.crAlertConf;


var TYPE = 'selectN';

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
      _crCaption = crCaption(items),
      oneC = _crCaption.oneC,
      threeC = _crCaption.threeC,
      title = _crCaption.title,
      subtitle = _crCaption.subtitle,
      seriaType = chartType.value,
      compType = chartType.compType,
      _itemKey = crItemKey(items, seriaType, date);

  return (0, _extends3.default)({}, dfProps, dialogOptions, {
    _type: TYPE,
    _itemKey: _itemKey,
    itemCaption: oneC,
    zhCompType: compType,
    time: date,
    seriaType: seriaType, seriaColor: seriaColor,
    items: items, loadId: loadId,
    title: title, subtitle: subtitle
  }, crAlertConf(oneC + ': ' + threeC, oneC, threeC), {
    dataSource: dataSource
  });
};

exports.default = createLoadOptions;
//# sourceMappingURL=selectN.js.map