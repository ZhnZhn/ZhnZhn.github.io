"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var zhToggleSeria = function zhToggleSeria(Chart) {
  Chart.prototype.zhToggleSeria = function (index) {
    try {
      var seria = this.series[index];
      if (seria) {
        if (seria.visible) {
          seria.hide();
        } else {
          seria.show();
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  };
};

exports.default = zhToggleSeria;
//# sourceMappingURL=zhToggleSeria.js.map