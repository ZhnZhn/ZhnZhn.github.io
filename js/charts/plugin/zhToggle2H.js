"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var PN_ID = 'zhIs2H';

var zhToggle2H = function zhToggle2H() {
  try {
    var _height = this[PN_ID] ? this.chartHeight / 2 : this.chartHeight * 2;

    this.setSize(undefined, _height, this.zhIsAnimation());
    this[PN_ID] = !this[PN_ID];
  } catch (err) {
    console.log(err.message);
  }
};

var _default = zhToggle2H;
exports["default"] = _default;
//# sourceMappingURL=zhToggle2H.js.map