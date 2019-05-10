'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var PN_ID = 'zhIs2H';

var zhToggle2H = function zhToggle2H() {
  try {
    var _height = this[PN_ID] ? this.chartHeight / 2 : this.chartHeight * 2;
    this.setSize(undefined, _height, true);
    this[PN_ID] = !this[PN_ID];
  } catch (err) {
    console.log(err.message);
  }
};

exports.default = zhToggle2H;
//# sourceMappingURL=zhToggle2H.js.map