'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DATA_LABELS = {
  enabled: true,
  color: 'black',
  crop: false,
  overflow: 'allow',
  style: {
    fontSize: 14
  }
};

var zhEnableDataLables = function zhEnableDataLables(Chart) {
  Chart.prototype.zhEnableDataLables = function () {
    var seriaType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'columnrange';
    var options = arguments[1];

    try {
      this.update({
        plotOptions: (0, _defineProperty3.default)({}, seriaType, {
          dataLabels: (0, _extends3.default)({}, options, DATA_LABELS)
        })
      });
    } catch (err) {
      console.log(err);
    }
  };
};

exports.default = zhEnableDataLables;
//# sourceMappingURL=zhEnableDataLabels.js.map