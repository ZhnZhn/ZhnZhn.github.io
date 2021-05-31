/**
 * @jest-environment jsdom
 */
//Highcharts dateFormat from AdapterFn require jsdom  
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _EuroStatApi = _interopRequireDefault(require("../EuroStatApi"));

var _apiFn = _interopRequireDefault(require("../api/apiFn"));

var URL = _apiFn["default"].URL,
    QUERY_TAIL = _apiFn["default"].QUERY_TAIL,
    DF_TAIL = _apiFn["default"].DF_TAIL;
var TYPE = 'selectN';
describe('getRequestUrl', function () {
  var DF_TABLE = 'table_1';
  var ITEMS = [{
    id: 'n1',
    value: 'v1'
  }, {
    id: 'n2',
    value: 'v2'
  }];
  var COLUMN_SET = 'COLUMN_SET';
  test('should return valid url for crUrlN spline', function () {
    var options = {
      _type: TYPE,
      dfTable: DF_TABLE,
      items: [].concat(ITEMS)
    },
        url = _EuroStatApi["default"].getRequestUrl(options);

    expect(url).toBe("" + URL + DF_TABLE + "?n1=v1&n2=v2" + QUERY_TAIL);
  });
  test('should return valid url for crUrlN category chart', function () {
    var time = 2017;

    var options = {
      _type: TYPE,
      dfTable: DF_TABLE,
      items: [undefined].concat(ITEMS),
      seriaType: COLUMN_SET,
      time: time
    },
        url = _EuroStatApi["default"].getRequestUrl(options);

    expect(url).toBe("" + URL + DF_TABLE + "?n1=v1&n2=v2&time=" + time + "&" + DF_TAIL);
  });
});
//# sourceMappingURL=EuroStatApi.test.js.map