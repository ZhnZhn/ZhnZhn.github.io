"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.categoryRoc = exports.categoryRate = exports.categoryDiff = void 0;
var _fCategoryCalc = _interopRequireDefault(require("./fCategoryCalc"));
var _diff = _interopRequireDefault(require("./diff"));
var _rate = _interopRequireDefault(require("./rate"));
var _roc = _interopRequireDefault(require("./roc"));
const _calcDiff = (p1, p2) => p2 && p2.y !== null ? (0, _diff.default)(p1.y, p2.y) : 0;
const categoryDiff = exports.categoryDiff = (0, _fCategoryCalc.default)(_calcDiff);
const _calcRate = (p1, p2) => p2 && p2.y !== null && p2.y !== 0 ? (0, _rate.default)(p1.y, p2.y) : 0;
const categoryRate = exports.categoryRate = (0, _fCategoryCalc.default)(_calcRate);
const _calcRoc = (p1, p2) => (0, _roc.default)(p2?.y, p1.y);
const categoryRoc = exports.categoryRoc = (0, _fCategoryCalc.default)(_calcRoc);
//# sourceMappingURL=categoryFn.js.map