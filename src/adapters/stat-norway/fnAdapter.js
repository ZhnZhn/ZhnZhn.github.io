import JSONstat from 'jsonstat';

import AdapterFn from '../AdapterFn';

const {
  isYNumber,
  numberFormat,
  crId,
  roundBy,
  valueMoving
} = AdapterFn;

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
  },
  SFL: {
    url: 'http://pxnet2.stat.fi/PXWeb/pxweb/en/StatFin/',
    title: "Statistics Finland's PX-Web"
  }
};

const DF_SOURCE = 'Unknown';

const _crSearchToken = (label) => {
  const _arr = (label || '').toString().split(',');
  return _arr[0] || '';
};

const _crLink = (token, {url, title}) => `<a class="native-link" href="${url}${token}">${title}</a>`;

const _crToken = ({ dfId }) => {
  const arr = (''+dfId).split('/')
  , id = arr.pop()
  , prefix = arr.join('__');
  return prefix && id ? `StatFin__${prefix}/${id}` : '';
}

const _crSearchLink = (label, option) => {
  const  _token = _crSearchToken(label);
  switch(option.loadId){
    case 'NST': case 'NST_2':
      return _crLink(_token, SEARCH.NST);
    case 'SWS':
      return _crLink(_token, SEARCH.SWS);
    case 'SFL':
      return _crLink(_crToken(option), SEARCH.SFL);
    default:
      return '';
  }
  /*
  switch(option.browserType){
    case 'NST': case 'NST_ALL':
      return _crLink(_token, SEARCH.NST);
    case 'SWS': case 'SWS_ALL':
      return _crLink(_token, SEARCH.SWS);
    case 'SFL':
      return _crLink(_crToken(option), SEARCH.SFL);
    default:
      return '';
  }
  */
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


const _getDimensionWithouTime = (ds) => {
  const _dim = ds.Dimension("Year")
   || ds.Dimension("Vuosi")
   || ds.Dimension("Vuosineljännes")
   || ds.Dimension("Month");
  return _dim && _dim.id
    ? [_dim.id[0]]
    : ["2019"];
};

const _getTimeDimension = (ds, timeId) => {
  const _dimTimeId = timeId && ds.Dimension(timeId)
  , _dim = _dimTimeId || ds.Dimension("Tid")
  , times = _dim && _dim.id
     || _getDimensionWithouTime(ds);

  return times;
}

const fnAdapter = {
  isYNumber, numberFormat, crId, roundBy,
  crValueMoving: valueMoving,

  crTitle: (option) => {
    switch(option.browserType){
      case 'NST':
      case 'NST_ALL':
        return TITLE.NST;
      case 'SWS':
      case 'SWS_ALL':
        return TITLE.SWS;
      default:
        return '';
    }
  },

  crDsValuesTimes: (json, option) => {
    const mapSlice = _crAreaMapSlice(option)
        , ds = JSONstat(json).Dataset(0)
        , values = ds.Data(mapSlice)
        , times = _getTimeDimension(ds, option.timeId);
    return { ds, values, times };
  },

  crTid: (time, ds) => {
    if (time) {
      return time;
    }
    const tidIds = _getTimeDimension(ds);
    return tidIds[tidIds.length-1];
  },

  crInfo: (ds, option) => ({
    name: ds.label || '',
    description: _crDescr(ds, option)
  }),

  crZhConfig: (option) => {
    const {
      _itemKey, url, loadId,
      optionFetch, items,
      title, subtitle, itemCaption: caption,
      seriaType,
      dataSource, dfId, timeId
    } = option
    , key = _itemKey || crId()
    , itemCaption = caption || _crItemCaption(option);
    return {
      id: key, key,
      itemCaption,
      itemConf: {
        _itemKey: key, url, loadId,
        optionFetch, items,
        title, subtitle,
        itemCaption, seriaType,
        dataSource,
        //sfl
        dfId, timeId
      },
      isWithoutAdd: url ? false : true,
      //isWithoutAdd: true,
      dataSource
    };
  },

  crChartOption: (ds, data, option) => ({
    info: fnAdapter.crInfo(ds, option),
    valueMoving: fnAdapter.crValueMoving(data),
    zhConfig: fnAdapter.crZhConfig(option)
  })
}

export default fnAdapter
