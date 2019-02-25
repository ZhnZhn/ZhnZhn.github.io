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
    crItemKey = _createrFns2.default.crItemKey;


var COUNTRY_CAPTION_DF = 'EU';

var _toIds = function _toIds(_ref, items) {
  var dfId = _ref.dfId;

  var _arr = [dfId];
  items.forEach(function (_ref2) {
    var slice = _ref2.slice;

    if (slice) {
      _arr.push(slice[Object.keys(slice)[0]]);
    }
  });
  return _arr;
};

var createLoadOptions = function createLoadOptions() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var loadId = props.loadId,
      group = props.group,
      dataSource = props.dataSource,
      dfProps = props.dfProps,
      timeId = props.timeId,
      _options$items = options.items,
      items = _options$items === undefined ? [] : _options$items,
      _options$chartType = options.chartType,
      chartType = _options$chartType === undefined ? {} : _options$chartType,
      seriaColor = options.seriaColor,
      date = options.date,
      dateDefault = options.dateDefault,
      selectOptions = options.selectOptions,
      seriaType = chartType.value,
      zhCompType = chartType.compType,
      _countryValue = items[0] ? items[0].value : COUNTRY_CAPTION_DF,
      twoV = items[1] ? items[1].value : undefined,
      _crCaption = crCaption(items),
      oneC = _crCaption.oneC,
      title = _crCaption.title,
      subtitle = _crCaption.subtitle,
      time = date ? date.value : dateDefault,
      _items = _toIds(dfProps, items),
      _itemKey = crItemKey(_items, seriaType, time);

  return (0, _extends3.default)({}, dfProps, {
    _itemKey: _itemKey,
    geo: _countryValue,
    group: group,
    metric: twoV,
    itemCaption: oneC,
    alertGeo: oneC,
    loadId: loadId,
    title: title, subtitle: subtitle,
    seriaType: seriaType, seriaColor: seriaColor,
    zhCompType: zhCompType,
    time: time, timeId: timeId,
    dataSource: dataSource,
    items: items,
    selectOptions: selectOptions
  });
};

exports.default = createLoadOptions;
//# sourceMappingURL=eurostatN.js.map