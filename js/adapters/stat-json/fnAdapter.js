"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _jsonstat = _interopRequireDefault(require("jsonstat"));

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var _crFn = require("../crFn");

const {
  isYNumber,
  numberFormat,
  roundBy,
  valueMoving,
  crItemConf,
  toUpperCaseFirst
} = _AdapterFn.default;
const _keys = Object.keys;
const TITLE = {
  NST: 'Statisctics Norway: All Items',
  SWS: 'Statisctics Sweden: All Items'
};

const _crSearchTitle = country => "Statistics " + country + " Search";

const SEARCH = {
  NST: {
    url: 'https://www.ssb.no/en/sok?sok=',
    title: _crSearchTitle('Norway')
  },
  SWS: {
    url: 'https://www.scb.se/en/finding-statistics/search/?query=',
    title: _crSearchTitle('Sweden')
  },
  SFL: {
    url: 'http://pxnet2.stat.fi/PXWeb/pxweb/en/StatFin/',
    title: "Statistics Finland's PX-Web"
  },
  SDN: {
    url: 'https://www.statbank.dk/statbank5a/default.asp',
    title: _crSearchTitle('Denmark')
  },
  SIR: {
    url: 'https://data.cso.ie/',
    title: "CSO Ireland Web PxStat"
  }
};
const MAX_SOURCE_ID_LENGTH = 9;
const _assign = Object.assign;

const _crSearchToken = label => {
  const _arr = (label || '').toString().split(',');

  return _arr[0] || '';
};

const _crLink = function (_ref, token) {
  let {
    url,
    title
  } = _ref;

  if (token === void 0) {
    token = '';
  }

  return "<a class=\"native-link\" href=\"" + url + token + "\">" + title + "</a>";
};

const _crSflSearchToken = _ref2 => {
  let {
    dfId
  } = _ref2;
  const arr = ('' + dfId).split('/'),
        id = arr.pop(),
        prefix = arr.join('__');
  return prefix && id ? "StatFin__" + prefix + "/" + id : '';
};

const _crSearchLink = (label, option) => {
  const _token = _crSearchToken(label);

  switch (option.loadId) {
    case 'NST':
    case 'NST_2':
      return _crLink(SEARCH.NST, _token);

    case 'SWS':
      return _crLink(SEARCH.SWS, _token);

    case 'SFL':
      return _crLink(SEARCH.SFL, _crSflSearchToken(option));

    case 'SDN':
      return _crLink(SEARCH.SDN);

    case 'SIR':
      return _crLink(SEARCH.SIR);

    default:
      return '';
  }
};

const _crDescr = (_ref3, option) => {
  let {
    updated,
    source,
    label
  } = _ref3;

  const _date = (updated || '').replace('T', ' ').replace('Z', ''),
        {
    dfId
  } = option,
        _elSearchLink = _crSearchLink(label, option);

  return dfId && source ? "TableId: " + dfId + "<BR/>" + source + ": " + _date + "<BR/>" + _elSearchLink : _elSearchLink;
};

const _crItemCaption = option => {
  const {
    items,
    dfId = 'id'
  } = option,
        caption = items[0] ? items[0].caption : 'All Items';
  return dfId + "_" + caption;
};

const _crAreaMapSlice = option => {
  const {
    items,
    dfTSlice
  } = option,
        mapSlice = {};
  items.forEach(item => {
    if (item.slice) {
      _assign(mapSlice, item.slice);
    }
  });
  return _assign(mapSlice, dfTSlice);
};

const _getDimensionWithouTime = ds => {
  const _dim = ds.Dimension("Year") || ds.Dimension("Vuosi") || ds.Dimension("Vuosineljännes") || ds.Dimension("Month");

  return _dim && _dim.id ? [_dim.id[0]] : ["2019"];
};

const _crTimesFromDs = (json, timeId) => {
  const _dim = json.dimension[timeId],
        label = ((_dim || {}).category || {}).label;
  return _keys(label).map(k => label[k]);
};

const _getTimeDimension = (ds, timeId, json) => {
  // SIR
  if (timeId && timeId.indexOf("TLIST(") !== -1) {
    return _crTimesFromDs(json, timeId);
  }

  const _dimTimeId = timeId && ds.Dimension(timeId),
        _dim = _dimTimeId || ds.Dimension("Tid"),
        times = _dim && _dim.id || _getDimensionWithouTime(ds);

  return times;
};

const _crDataSource = _ref4 => {
  let {
    dataSource,
    dfId
  } = _ref4;
  return dfId && ('' + dfId).length < MAX_SOURCE_ID_LENGTH ? dataSource + " (" + dfId + ")" : dataSource;
};

const fnAdapter = {
  crError: _crFn.crError,
  isYNumber,
  numberFormat,
  crId: _crFn.crId,
  roundBy,
  toUpperCaseFirst,
  crTitle: option => {
    switch (option.browserType) {
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
    const mapSlice = _crAreaMapSlice(option),
          ds = (0, _jsonstat.default)(json).Dataset(0),
          values = ds.Data(mapSlice),
          times = _getTimeDimension(ds, option.timeId, json);

    return [ds, values, times];
  },
  crTid: (time, ds) => {
    if (time) {
      return time;
    }

    const tidIds = _getTimeDimension(ds);

    return tidIds[tidIds.length - 1];
  },
  crInfo: (ds, option) => ({
    name: ds.label || '',
    description: _crDescr(ds, option)
  }),
  crZhConfig: option => {
    const {
      _itemKey,
      url,
      optionFetch,
      items,
      dataSource,
      dfId,
      timeId
    } = option,
          key = _itemKey || (0, _crFn.crId)(),
          itemCaption = option.itemCaption || _crItemCaption(option),
          itemConf = url ? {
      _itemKey: key,
      ...crItemConf(option),
      optionFetch,
      items,
      dataSource,
      //sfl
      dfId,
      timeId
    } : void 0;

    return {
      id: key,
      key,
      itemCaption,
      itemConf,
      dataSource: _crDataSource(option)
    };
  },
  crConfOption: (ds, option) => ({
    info: fnAdapter.crInfo(ds, option),
    zhConfig: fnAdapter.crZhConfig(option)
  }),
  crChartOption: (ds, data, option) => ({
    valueMoving: valueMoving(data),
    ...fnAdapter.crConfOption(ds, option)
  })
};
var _default = fnAdapter;
exports.default = _default;
//# sourceMappingURL=fnAdapter.js.map