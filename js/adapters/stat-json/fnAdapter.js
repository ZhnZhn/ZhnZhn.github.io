"use strict";

exports.__esModule = true;
exports.toUpperCaseFirst = exports.roundBy = exports.isYNumber = exports.crZhConfig = exports.crTitle = exports.crInfo = exports.crErrorByMessage = exports.crConfOption = exports.crChartOption = void 0;
var _AdapterFn = require("../AdapterFn");
exports.isYNumber = _AdapterFn.isYNumber;
exports.roundBy = _AdapterFn.roundBy;
exports.toUpperCaseFirst = _AdapterFn.toUpperCaseFirst;
exports.crErrorByMessage = _AdapterFn.crErrorByMessage;
var _crFn = require("../crFn");
exports.crId = _crFn.crId;
var _arrFn = require("../../utils/arrFn");
var _JsonStatFn = require("../JsonStatFn");
const _crTitle = country => "Statisctics " + country + ": All Items",
  TITLE_NST = _crTitle('Norway'),
  TITLE_SWS = _crTitle('Sweden');
const _crSearchTitle = country => "Statistics " + country + " Search";
const SEARCH_NST = ['https://www.ssb.no/en/sok?sok=', _crSearchTitle('Norway')],
  SEARCH_SWS = ['https://www.scb.se/en/finding-statistics/search/?query=', _crSearchTitle('Sweden')],
  SEARCH_SFL = ['https://statfin.stat.fi/PXWeb/pxweb/en/StatFin/', "Statistics Finland's PX-Web"],
  SEARCH_SDN = ['https://www.statbank.dk/statbank5a/default.asp', _crSearchTitle('Denmark')],
  SEARCH_SIR = ['https://data.cso.ie/', "CSO Ireland Web PxStat"],
  _crFsoLink = _ref => {
    let {
      dfId
    } = _ref;
    return ["https://www.pxweb.bfs.admin.ch/pxweb/en/" + dfId + "/-/" + dfId + ".px/", 'Statistics Swiss Stat-Tab'];
  };
const MAX_SOURCE_ID_LENGTH = 9;
const _crSearchToken = label => {
  const _arr = (label || '').toString().split(',');
  return _arr[0] || '';
};
const _crLink = function (_ref2, token) {
  let [url, title] = _ref2;
  if (token === void 0) {
    token = '';
  }
  return "<a class=\"native-link\" href=\"" + url + token + "\">" + title + "</a>";
};
const _crSflSearchToken = _ref3 => {
  let {
    dfId
  } = _ref3;
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
      return _crLink(SEARCH_NST, _token);
    case 'SWS':
      return _crLink(SEARCH_SWS, _token);
    case 'SFL':
      return _crLink(SEARCH_SFL, _crSflSearchToken(option));
    case 'SDN':
      return _crLink(SEARCH_SDN);
    case 'SIR':
      return _crLink(SEARCH_SIR);
    case 'FSO':
      return _crLink(_crFsoLink(option));
    default:
      return '';
  }
};
const _crDescr = (option, json) => {
  const _date = ((0, _JsonStatFn.getDatasetUpdated)(json) || '').replace('T', ' ').replace('Z', ''),
    {
      dfId
    } = option,
    _elSearchLink = _crSearchLink((0, _JsonStatFn.getDatasetLabel)(json), option),
    _source = (0, _JsonStatFn.getDatasetSource)(json);
  return dfId && _source ? "TableId: " + dfId + "<BR/>" + _source + ": " + _date + "<BR/>" + _elSearchLink : _elSearchLink;
};
const _crItemCaption = _ref4 => {
  let {
    items,
    dfId
  } = _ref4;
  return (dfId || 'id') + "_" + ((items[0] || {}).caption || 'All Items');
};
const _crDataSource = _ref5 => {
  let {
    dataSource,
    dfId
  } = _ref5;
  return dfId && ('' + dfId).length < MAX_SOURCE_ID_LENGTH ? dataSource + " (" + dfId + ")" : dataSource;
};
const crTitle = option => {
  switch (option.browserType) {
    case 'NST':
    case 'NST_ALL':
      return TITLE_NST;
    case 'SWS':
    case 'SWS_ALL':
      return TITLE_SWS;
    case 'ES':
      return (0, _arrFn.joinByColon)(option.title, option.subtitle);
    default:
      return '';
  }
};
exports.crTitle = crTitle;
const crInfo = (option, json) => ({
  name: (0, _JsonStatFn.getDatasetLabel)(json) || '',
  description: _crDescr(option, json)
});
exports.crInfo = crInfo;
const crZhConfig = option => {
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
    itemConf = url ? Object.assign({
      _itemKey: key
    }, (0, _crFn.crItemConf)(option), {
      optionFetch,
      items,
      dataSource,
      //sfl
      dfId,
      timeId
    }) : void 0;
  return {
    id: key,
    key,
    itemCaption,
    itemConf,
    dataSource: _crDataSource(option)
  };
};
exports.crZhConfig = crZhConfig;
const crConfOption = (option, json) => ({
  info: crInfo(option, json),
  zhConfig: crZhConfig(option)
});
exports.crConfOption = crConfOption;
const crChartOption = (data, option, json) => Object.assign({
  valueMoving: (0, _AdapterFn.valueMoving)(data)
}, crConfOption(option, json));
exports.crChartOption = crChartOption;
//# sourceMappingURL=fnAdapter.js.map