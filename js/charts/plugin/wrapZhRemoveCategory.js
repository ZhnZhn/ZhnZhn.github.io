'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getExtremes = function _getExtremes(v1, v2) {
  return v1 >= v2 ? { min: v2, max: v1 } : { min: v1, max: v2 };
};

var wrapZhRemoveCategory = function wrapZhRemoveCategory(wrap, Chart) {
  wrap(Chart.prototype, 'zhRemoveCategory', function (fn, id) {
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

exports.default = wrapZhRemoveCategory;
//# sourceMappingURL=wrapZhRemoveCategory.js.map