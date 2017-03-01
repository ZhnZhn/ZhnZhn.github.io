'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var createLoadOptions = function createLoadOptions() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var loadId = props.loadId,
      group = props.group,
      one = options.one,
      two = options.two,
      oneValue = one.value,
      _one$caption = one.caption,
      oneCaption = _one$caption === undefined ? '' : _one$caption,
      twoValue = two.value,
      _two$caption = two.caption,
      twoCaption = _two$caption === undefined ? '' : _two$caption;

  return {
    geo: oneValue,
    group: group,
    metric: twoValue,
    loadId: loadId,
    itemCaption: oneCaption,
    title: oneCaption,
    subtitle: twoCaption,
    alertItemId: oneCaption + ':' + twoCaption,
    alertGeo: oneCaption,
    alertMetric: twoCaption
  };
};

exports.default = createLoadOptions;
//# sourceMappingURL=eurostat.js.map