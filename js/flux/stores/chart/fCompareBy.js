'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _big = require('big.js');

var _big2 = _interopRequireDefault(_big);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MIN_STR = String(Number.MIN_SAFE_INTEGER);

var fCompareBy = function fCompareBy(propName) {
    return function (aC, bC) {
        var aVm = aC.valueMoving || {},
            a = (0, _big2.default)(aVm[propName] || MIN_STR),
            bVm = bC.valueMoving || {},
            b = (0, _big2.default)(bVm[propName] || MIN_STR);
        if (a.gt(b)) return 1;
        if (b.gt(a)) return -1;
        return 0;
    };
};

exports.default = fCompareBy;
//# sourceMappingURL=fCompareBy.js.map