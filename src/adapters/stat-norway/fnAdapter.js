import Highcharts from 'highcharts';
import JSONstat from 'jsonstat';

import AdapterFn from '../AdapterFn';

const TITLE = {
  NST: 'Statisctics Norway: All Items',
  SWS: 'Statisctics Sweden: All Items'
};

const SEARCH = {
  NST: {
    url: 'https://www.ssb.no/en/sok?sok=',
    title: 'Statistics Norway Search'
  },
  SWS: {
    url: 'https://www.scb.se/en/finding-statistics/search/?query=',
    title: 'Statistics Sweden Search'
  }
};

const DF_SOURCE = 'Unknown';

const _crSearchToken = (label) => {
  const _arr = (label || '').toString().split(',');
  return _arr[0] || '';
};

const _crLink = (token, {url, title}) => `<a class="native-link" href="${url}${token}">${title}</a>`;

const _crSearchLink = (label, option) => {
  const  _token = _crSearchToken(label);
  switch(option.browserType){
    case 'NST': case 'NST_ALL':
      return _crLink(_token, SEARCH.NST);
    case 'SWS': case 'SWS_ALL':
      return _crLink(_token, SEARCH.SWS);
    default:
      return '';
  }
};

const _crDescr = ({ updated='', source=DF_SOURCE, label }, option) => {
  const _date = updated
          .replace('T', ' ')
          .replace('Z', '')
      , { dfId='' } = option
      , _elSearchLink = _crSearchLink(label, option);

  return `TableId: ${dfId}<BR/>${source}: ${_date}<BR/>${_elSearchLink}`;
};

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
  isYNumber: AdapterFn.isYNumber,

  crTitle: (option) => {
    switch(option.browserType){
      case 'NST': case 'NST_ALL':
        return TITLE.NST;
      case 'SWS': case 'SWS_ALL':
        return TITLE.SWS;
      default:
        return '';
    }
  },

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

  crInfo: (ds, option) => {
    const { label='' } = ds;
    return {
      name: label,
      description: _crDescr(ds, option)
    }
  },

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
