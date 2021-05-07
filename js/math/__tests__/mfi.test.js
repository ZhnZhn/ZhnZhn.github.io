"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _mfi2 = _interopRequireDefault(require("../mfi"));

//date, open or close (not used), high, low, close, volume
var data = [[0, 140.16, 140.47, 139.2, 140.16, 7294216], [1, 140.61, 140.96, 139.71, 140.61, 8828513], [2, 139.71, 140.57, 139.61, 139.71, 6428708], [3, 140.79, 141.77, 138.82, 140.79, 8183789], [4, 141.2, 141.69, 140.55, 141.2, 5476409], [5, 139.67, 141.45, 139.43, 139.67, 6353183], [6, 139.9, 140.34, 139.03, 139.9, 7702584], [7, 137.91, 140, 137.64, 137.91, 7646303], [8, 138.38, 138.95, 137.55, 138.38, 5394897], [9, 137.89, 138.59, 137.87, 137.89, 4696711], [10, 139.63, 140, 137.9, 139.63, 6557869], [11, 139.91, 140, 139.13, 139.91, 6597268], [12, 142.12, 142.74, 139.68, 142.12, 9046321], [13, 140.72, 142.03, 140.1, 140.72, 6389991], [14, 140.6, 141, 140.3, 140.6, 3980535]];
describe('math mfi', function () {
  test('should calc mfi for period', function () {
    var _mfi = (0, _mfi2["default"])(data, '10'),
        _result = _mfi[0],
        nNotFullPoint = _mfi[1];

    expect(nNotFullPoint).toBe(0);
    expect(_result[14].y).toBe(34.62);
    expect(_result[13].y).toBe(42.21);
    expect(_result[12].y).toBe(53.26);
    expect(_result[11].y).toBe(41.38); //41.39

    expect(_result[10].y).toBe(null);
  });
});
//# sourceMappingURL=mfi.test.js.map