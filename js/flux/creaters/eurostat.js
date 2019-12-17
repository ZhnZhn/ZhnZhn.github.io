"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

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
      dfProps = _props.dfProps,
      _options = options,
      one = _options.one,
      two = _options.two,
      oneValue = one.value,
      _one$caption = one.caption,
      oneCaption = _one$caption === void 0 ? '' : _one$caption,
      twoValue = two.value,
      _two$caption = two.caption,
      twoCaption = _two$caption === void 0 ? '' : _two$caption,
      mapSlice = two.mapSlice;
  return (0, _extends2["default"])({}, dfProps, {
    seriaType: 'AREA',
    geo: oneValue,
    metric: twoValue,
    loadId: loadId,
    itemCaption: oneCaption,
    title: oneCaption,
    subtitle: twoCaption,
    alertItemId: oneCaption + ":" + twoCaption,
    alertGeo: oneCaption,
    alertMetric: twoCaption,
    dataSource: dataSource,
    mapSlice: mapSlice,
    items: [one, two]
  });
};

var _default = createLoadOptions;
exports["default"] = _default;
//# sourceMappingURL=eurostat.js.map