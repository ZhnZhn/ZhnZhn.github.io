/**
 * @jest-environment jsdom
 */
//Highcharts dateFormat from AdapterFn require jsdom
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _EuroStatApi = _interopRequireDefault(require("../EuroStatApi"));

var _apiFn = require("../api/apiFn");

const TYPE = 'selectN';
describe('getRequestUrl', () => {
  const DF_TABLE = 'table_1';
  const ITEMS = [{
    id: 'n1',
    value: 'v1'
  }, {
    id: 'n2',
    value: 'v2'
  }];
  const COLUMN_SET = 'COLUMN_SET';
  test('should return valid url for crUrlN spline', () => {
    const options = {
      _type: TYPE,
      dfTable: DF_TABLE,
      items: [...ITEMS]
    },
          url = _EuroStatApi.default.getRequestUrl(options);

    expect(url).toBe("" + _apiFn.URL + DF_TABLE + "?n1=v1&n2=v2" + _apiFn.QUERY_TAIL);
  });
  test('should return valid url for crUrlN category chart', () => {
    const time = 2017;

    const options = {
      _type: TYPE,
      dfTable: DF_TABLE,
      items: [undefined, ...ITEMS],
      seriaType: COLUMN_SET,
      time
    },
          url = _EuroStatApi.default.getRequestUrl(options);

    expect(url).toBe("" + _apiFn.URL + DF_TABLE + "?n1=v1&n2=v2&time=" + time + "&" + _apiFn.DF_TAIL);
  });
});
//# sourceMappingURL=EuroStatApi.test.js.map