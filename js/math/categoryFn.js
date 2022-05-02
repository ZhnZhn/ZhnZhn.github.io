"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.categoryRoc = exports.categoryRate = exports.categoryDiff = void 0;

var _fCategoryCalc = _interopRequireDefault(require("./fCategoryCalc"));

var _diff = _interopRequireDefault(require("./diff"));

var _rate = _interopRequireDefault(require("./rate"));

var _roc = _interopRequireDefault(require("./roc"));

const _calcDiff = (p1, p2) => p2 && p2.y !== null ? (0, _diff.default)(p1.y, p2.y) : 0;

const categoryDiff = (0, _fCategoryCalc.default)(_calcDiff);
exports.categoryDiff = categoryDiff;

const _calcRate = (p1, p2) => p2 && p2.y !== null && p2.y !== 0 ? (0, _rate.default)(p1.y, p2.y) : 0;

const categoryRate = (0, _fCategoryCalc.default)(_calcRate);
exports.categoryRate = categoryRate;

const _calcRoc = (p1, p2) => (0, _roc.default)((p2 || {}).y, p1.y);

const categoryRoc = (0, _fCategoryCalc.default)(_calcRoc);
exports.categoryRoc = categoryRoc;
//# sourceMappingURL=categoryFn.js.map