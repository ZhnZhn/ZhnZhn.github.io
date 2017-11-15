import Highcharts from 'highcharts';
import AdapterFn from '../AdapterFn'

const _crDescr = (updated, option) => {
  const _date = updated
          .replace('T', ' ')
          .replace('Z', '')
      , { dfId='' } = option;

  return `TableId: ${dfId} <BR/> Statisctics Norway: ${_date}`;
}

const fnAdapter = {
  crId: (option) => {
    const { items, dfId='id' } = option
         , _caption =  items[0]
              ? items[0].caption : 'All Items';
    return dfId + '_' + _caption;
  },

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
        , _id = fnAdapter.crId(option);
    return {
      id: _id,
      key: _id,
      itemCaption: _id,
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

  numberFormat: (value) => {
    const arrSplit = (value+'').split('.')
        , decimal = arrSplit[1] ? arrSplit[1].length : 0;
     return Highcharts
       .numberFormat(value, decimal, '.', ' ');
  }

}

export default fnAdapter
