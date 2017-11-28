'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _RouterAdapter = require('./RouterAdapter');

var _RouterAdapter2 = _interopRequireDefault(_RouterAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IexAdapter = {
  toConfig: function toConfig(json, option) {
    var config = _RouterAdapter2.default.getAdapter(option).toConfig(json, option);
    //console.log(json)
    return { config: config };
  },
  toSeries: function toSeries(json, option, chart) {
    var seria = _RouterAdapter2.default.getAdapter(option).toSeria(json, option, chart);
    return seria;
  }
};

exports.default = IexAdapter;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\iex\IexAdapter.js.map