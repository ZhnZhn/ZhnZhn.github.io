"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var WEEK_IN_MLS = 1000 * 60 * 60 * 24 * 7;
var HOUR_IN_MLS = 1000 * 60 * 60;
var zhIs = {
  zhIsAnimation: function zhIsAnimation() {
    return ((this.userOptions || {}).zhConfig || {}).withoutAnimation ? false : true;
  },
  zhIsDaily: function zhIsDaily(seriaIndex) {
    var _ref, _this$series;

    if (seriaIndex === void 0) {
      seriaIndex = 0;
    }

    var _data = (_ref = (_this$series = this.series) == null ? void 0 : _this$series[0].data) != null ? _ref : [],
        _max = _data.length - 1;

    if (_max < 2) {
      return false;
    }

    var _xTo = _data[_max].x,
        _xFrom = _data[_max - 1].x,
        _xPeriod = _xTo - _xFrom;

    return _xPeriod < WEEK_IN_MLS && _xPeriod > HOUR_IN_MLS;
  }
};
var _default = zhIs;
exports["default"] = _default;
//# sourceMappingURL=zhIs.js.map