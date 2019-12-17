"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var zhToggleSeria = function zhToggleSeria(index) {
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

var _default = zhToggleSeria;
exports["default"] = _default;
//# sourceMappingURL=zhToggleSeria.js.map