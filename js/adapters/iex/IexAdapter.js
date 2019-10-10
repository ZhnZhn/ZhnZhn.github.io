'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _RouterAdapter = require('./RouterAdapter');

var _RouterAdapter2 = _interopRequireDefault(_RouterAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IexAdapter = {
  crKey: function crKey() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$one = _ref.one,
        one = _ref$one === undefined ? '' : _ref$one,
        _ref$two = _ref.two,
        two = _ref$two === undefined ? '' : _ref$two;

    return one + '_' + two;
  },
  toConfig: function toConfig(json, option) {
    var config = _RouterAdapter2.default.getAdapter(option).toConfig(json, option);
    return { config: config };
  },
  toSeries: function toSeries(json, option, chart) {
    var seria = _RouterAdapter2.default.getAdapter(option).toSeries(json, option, chart);
    return seria;
  }
};

exports.default = IexAdapter;
//# sourceMappingURL=IexAdapter.js.map