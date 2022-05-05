"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.compareByY = exports.compareByValueId = exports.compareByValue = exports.compareByDate = void 0;

var _fCompareBy = _interopRequireDefault(require("../utils/fCompareBy"));

var _fCompareByTwoProps = _interopRequireDefault(require("../utils/fCompareByTwoProps"));

const compareByDate = (0, _fCompareBy.default)(0);
exports.compareByDate = compareByDate;
const compareByY = (0, _fCompareBy.default)('y');
exports.compareByY = compareByY;
const compareByValue = (0, _fCompareBy.default)('value');
exports.compareByValue = compareByValue;
const compareByValueId = (0, _fCompareByTwoProps.default)('value', 'id');
exports.compareByValueId = compareByValueId;
//# sourceMappingURL=compareByFn.js.map