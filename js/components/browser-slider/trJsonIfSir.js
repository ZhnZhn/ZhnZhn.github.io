"use strict";

exports.__esModule = true;
exports.default = void 0;

const trJsonIfSir = (json, lT) => {
  if (lT === 'SIR') {
    json.forEach(item => {
      if (item.type === 't') {
        item.text = item.id + ": " + item.text;
      }
    });
  }

  return json;
};

var _default = trJsonIfSir;
exports.default = _default;
//# sourceMappingURL=trJsonIfSir.js.map