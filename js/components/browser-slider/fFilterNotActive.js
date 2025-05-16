"use strict";

exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
let _currentYear;
const _getCurrentYear = () => _currentYear || (_currentYear = new Date().getUTCFullYear());
const _filterNotActive = item => {
  const _yUpdated = (0, _isTypeFn.parseIntBy10)(('' + item.updated).trim().slice(0, 4));
  return (0, _isTypeFn.isNumber)(_yUpdated) ? _getCurrentYear() - _yUpdated < 3 : !0;
};
const _filterSdn = item => item.active;
const fFilterNotActive = (is, lT) => is ? lT === 'SDN' ? _filterSdn : _filterNotActive : void 0;
var _default = exports.default = fFilterNotActive;
//# sourceMappingURL=fFilterNotActive.js.map