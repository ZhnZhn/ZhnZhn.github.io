/**
 * @jest-environment jsdom
 */
//Highcharts dateFormat from AdapterFn require jsdom
"use strict";

import {
  CHT_COLUMN_SET
} from '../../../constants/ChartType';

import api from '../EuroStatApi'
import {
  STAT_API_URL,
  QUERY_TAIL,
  DF_TAIL
} from '../api/apiFn';

const TYPE = 'selectN';

describe('getRequestUrl', ()=>{
  const DF_TABLE = 'table_1';
  const ITEMS = [
    {id: 'n1', value: 'v1'},
    {id: 'n2', value: 'v2'}
  ];  

  test('should return valid url for crUrlN spline', ()=>{
      const options = {
        _type: TYPE,
        dfTable: DF_TABLE,
        items: [...ITEMS]
      },
      url = api.getRequestUrl(options);
      expect(url).toBe(`${STAT_API_URL}/${DF_TABLE}?n1=v1&n2=v2${QUERY_TAIL}`)
  })
  test('should return valid url for crUrlN category chart', ()=>{
    const time = 2017;
    const options = {
      _type: TYPE,
      dfTable: DF_TABLE,
      items: [ undefined, ...ITEMS ],
      seriaType: CHT_COLUMN_SET,
      time
    },
    url = api.getRequestUrl(options);
    expect(url).toBe(`${STAT_API_URL}/${DF_TABLE}?n1=v1&n2=v2&time=${time}${DF_TAIL}`)
  })

})
