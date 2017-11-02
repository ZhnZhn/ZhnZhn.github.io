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
      group = props.group,
      dataSource = props.dataSource,
      dfProps = props.dfProps,
      one = options.one,
      two = options.two,
      oneValue = one.value,
      _one$caption = one.caption,
      oneCaption = _one$caption === undefined ? '' : _one$caption,
      twoValue = two.value,
      _two$caption = two.caption,
      twoCaption = _two$caption === undefined ? '' : _two$caption,
      mapSlice = two.mapSlice;

  return (0, _extends3.default)({}, dfProps, {
    seriaType: 'AREA',
    geo: oneValue,
    group: group,
    metric: twoValue,
    loadId: loadId,
    itemCaption: oneCaption,
    title: oneCaption,
    subtitle: twoCaption,
    alertItemId: oneCaption + ':' + twoCaption,
    alertGeo: oneCaption,
    alertMetric: twoCaption,
    dataSource: dataSource, mapSlice: mapSlice,
    items: [one, two]
  });
};

exports.default = createLoadOptions;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\creaters\eurostat.js.map