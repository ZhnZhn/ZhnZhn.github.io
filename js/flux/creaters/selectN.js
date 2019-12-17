"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _createrFns = _interopRequireDefault(require("./createrFns"));

var crCaption = _createrFns["default"].crCaption,
    crItemKey = _createrFns["default"].crItemKey,
    crAlertConf = _createrFns["default"].crAlertConf;
var TYPE = 'selectN';

var createLoadOptions = function createLoadOptions(props, options) {
  if (props === void 0) {
    props = {};
  }

  if (options === void 0) {
    options = {};
  }

  var _props = props,
      loadId = _props.loadId,
      dataSource = _props.dataSource,
      _props$dfProps = _props.dfProps,
      dfProps = _props$dfProps === void 0 ? {} : _props$dfProps,
      _options = options,
      _options$items = _options.items,
      items = _options$items === void 0 ? [] : _options$items,
      dialogOptions = _options.dialogOptions,
      _options$chartType = _options.chartType,
      chartType = _options$chartType === void 0 ? {} : _options$chartType,
      seriaColor = _options.seriaColor,
      date = _options.date,
      _crCaption = crCaption(items),
      oneC = _crCaption.oneC,
      threeC = _crCaption.threeC,
      title = _crCaption.title,
      subtitle = _crCaption.subtitle,
      seriaType = chartType.value,
      compType = chartType.compType,
      _itemKey = crItemKey(items, seriaType, date);

  return (0, _extends2["default"])({}, dfProps, {}, dialogOptions, {
    _type: TYPE,
    _itemKey: _itemKey,
    itemCaption: oneC,
    zhCompType: compType,
    time: date,
    seriaType: seriaType,
    seriaColor: seriaColor,
    items: items,
    loadId: loadId,
    title: title,
    subtitle: subtitle
  }, crAlertConf(oneC + ": " + threeC, oneC, threeC), {
    dataSource: dataSource
  });
};

var _default = createLoadOptions;
exports["default"] = _default;
//# sourceMappingURL=selectN.js.map