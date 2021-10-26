"use strict";

exports.__esModule = true;
exports.default = void 0;

const toPlural = str => {
  if (!str) return str;

  const _lastIndex = str.length - 1;

  return str[_lastIndex] === 'y' ? str.slice(0, _lastIndex) + 'ies' : str + 's';
};

var _default = toPlural;
exports.default = _default;
//# sourceMappingURL=toPlural.js.map