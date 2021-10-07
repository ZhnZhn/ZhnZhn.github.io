"use strict";

exports.__esModule = true;
exports.default = void 0;

const trJsonSir = json => {
  json.forEach(item => {
    if (item.type === 't') {
      item.text = item.id + ": " + item.text;
    }
  });
  return json;
};

var _default = trJsonSir;
exports.default = _default;
//# sourceMappingURL=trJsonSir.js.map