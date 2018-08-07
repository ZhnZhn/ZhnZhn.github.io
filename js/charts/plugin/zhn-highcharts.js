'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ComponentActions = require('../../flux/actions/ComponentActions');

var _ComponentActions2 = _interopRequireDefault(_ComponentActions);

var _Type = require('../../constants/Type');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _getExtremes = function _getExtremes(v1, v2) {
  return v1 >= v2 ? { min: v2, max: v1 } : { min: v1, max: v2 };
};

var HighchartsZhn = function HighchartsZhn(Highcharts) {
  var Chart = Highcharts.Chart;
  Highcharts.wrap(Chart.prototype, 'showCredits', function (next, credits) {
    next.call(this, credits);
    if (credits.enabled) {
      this.credits.element.onclick = function () {
        var link = document.createElement('a');
        link.rel = "noopener noreferrer";
        link.target = credits.targer;
        link.href = credits.href;
        link.click();
      };
    }
  });

  Highcharts.wrap(Chart.prototype, 'exportChartLocal', function (fn) {
    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key = 1; _key < _len2; _key++) {
      args[_key - 1] = arguments[_key];
    }

    if (args.length === 0) {
      _ComponentActions2.default.showModalDialog(_Type.ModalDialog.CUSTOMIZE_EXPORT, { fn: fn, chart: this });
    } else {
      fn.apply(this, args);
    }
  });

  Highcharts.wrap(Chart.prototype, 'zhRemoveCategory', function (fn, id) {
    var _c = this.xAxis[0].categories;
    if (_c) {
      var _newC = _c.filter(function (str) {
        return str !== id;
      }),
          _newData = this.options.series[0].data.filter(function (p) {
        return p.c !== id && p.name !== id && p.id !== id;
      });
      if (_newC.length < _c.length) {
        if (!this.yAxis[0].userOptions.zhNotZoomToMinMax) {
          var _len = _newData.length,
              _getExtremes2 = _getExtremes(_newData[0].y, _newData[_len - 1].y),
              min = _getExtremes2.min,
              max = _getExtremes2.max;

          this.yAxis[0].setExtremes(min, max, false);
        }
        this.xAxis[0].setCategories(_newC, false);
        this.series[0].update({ data: _newData }, true);
      }
    }
  });
};

exports.default = HighchartsZhn;
//# sourceMappingURL=zhn-highcharts.js.map