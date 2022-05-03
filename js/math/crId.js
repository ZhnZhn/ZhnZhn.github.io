"use strict";

exports.__esModule = true;
exports.default = void 0;

const crId = prefix => (prefix || '') + Date.now().toString(36) + Math.random().toString(36).slice(2, 9);

var _default = crId;
exports.default = _default;
//# sourceMappingURL=crId.js.map