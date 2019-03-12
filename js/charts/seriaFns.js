"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var fns = {
  columnRange: function columnRange(d1, d2) {
    var d3 = [];
    d1.forEach(function (p1, index) {
      var p2 = d2[index];
      if (Boolean(p1.y) && Boolean(p2.y)) {
        d3.push({
          name: p1.category,
          low: p1.y <= p2.y ? p1.y : p2.y,
          high: p1.y >= p2.y ? p1.y : p2.y
        });
      }
    });
    return d3;
  }
};

exports.default = fns;
//# sourceMappingURL=seriaFns.js.map