import Highcharts from 'highcharts';
import JSONstat from 'jsonstat';

import AdapterFn from '../AdapterFn';

const _crDescr = (updated, option) => {
  const _date = updated
          .replace('T', ' ')
          .replace('Z', '')
      , { dfId='' } = option;

  return `TableId: ${dfId} <BR/> Statisctics Norway: ${_date}`;
}

const _crItemCaption = (option) => {
  const { items, dfId='id'} = option
       , caption =  items[0]
            ? items[0].caption
            : 'All Items';
  return `${dfId}_${caption}`;
}

const _crAreaMapSlice = (option) => {
  const { items, dfTSlice } = option
      , mapSlice = {};
  items.forEach(item => {
    if (item.slice) {
      Object.assign(mapSlice, item.slice)
    }
  })
  return Object.assign(mapSlice, dfTSlice)
};

const fnAdapter = {
  crDsValuesTimes: (json, option) => {
    const mapSlice = _crAreaMapSlice(option)
        , ds = JSONstat(json).Dataset(0)
        , values = ds.Data(mapSlice)
        , times = ds.Dimension("Tid").id;

    return { ds, values, times };
  },

  crId: () => AdapterFn.crId(),

  crTid: (time, ds) => {
    if (time) {
      return time;
    }
    const tidIds = ds.Dimension("Tid").id;
    return tidIds[tidIds.length-1];
  },

  crInfo: ({ label='', updated='' }, option) => ({
    name: label,
    description: _crDescr(updated, option)
  }),

  crZhConfig: (option) => {
    const { dataSource } = option
        , id = fnAdapter.crId()
        , itemCaption = _crItemCaption(option);
    return {
      id, key: id,
      itemCaption,
      isWithoutAdd: true,
      isWithLegend: false,
      dataSource
    };
  },

  crValueMoving: (d) => {
    if (Array.isArray(d)) {
      return AdapterFn.valueMoving(d);
    }
    return { date: d, direction: 'empty' };
  },

  crChartOption: (ds, data, option) => {
    return {
      info: fnAdapter.crInfo(ds, option),
      valueMoving: fnAdapter.crValueMoving(data),
      zhConfig: fnAdapter.crZhConfig(option)
    };
  },

  numberFormat: (value) => {
    const arrSplit = (value+'').split('.')
        , decimal = arrSplit[1]
            ? arrSplit[1].length
            : 0;
     return Highcharts
       .numberFormat(value, decimal, '.', ' ');
  }

}

export default fnAdapter
