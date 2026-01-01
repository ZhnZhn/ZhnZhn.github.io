export {
  isYNumber,
  toUpperCaseFirst,
  crErrorByMessage,
} from '../AdapterFn';
export {
  crId
} from '../crFn';

import { joinByColon } from '../../utils/arrFn';
import { valueMoving } from '../AdapterFn';
import {
  getDatasetLabel,
  getDatasetUpdated,
  getDatasetSource
} from '../JsonStatFn'
import {
  crId,
  crItemConf
} from '../crFn';

const _crTitle = country => `Statisctics ${country}: All Items`
, TITLE_NST = _crTitle('Norway')
, TITLE_SWS = _crTitle('Sweden');

const _crSearchTitle = country => `Statistics ${country} Search`;
const SEARCH_NST = [
  'https://www.ssb.no/en/sok?sok=',
  _crSearchTitle('Norway')
]
, SEARCH_SWS = [
  'https://www.scb.se/en/finding-statistics/search/?query=',
  _crSearchTitle('Sweden')
]
, SEARCH_SFL = [
  'https://statfin.stat.fi/PXWeb/pxweb/en/StatFin/',
  "Statistics Finland's PX-Web"
]
, SEARCH_SDN = [
  'https://www.statbank.dk/statbank5a/default.asp',
  _crSearchTitle('Denmark')
]
, SEARCH_SIR = [
  'https://data.cso.ie/',
  "CSO Ireland Web PxStat"
]
, _crFsoLink = ({ dfId }) => [
  `https://www.pxweb.bfs.admin.ch/pxweb/en/${dfId}/-/${dfId}.px/`,
  'Statistics Swiss Stat-Tab'
];

const MAX_SOURCE_ID_LENGTH = 9;

const _crSearchToken = (
  label
) => {
  const _arr = (label || '').toString().split(',');
  return _arr[0] || '';
};

const _crLink = (
  [url, title],
  token=''
) => `<a class="native-link" href="${url}${token}">${title}</a>`;

const _crSflSearchToken = ({
  dfId
}) => {
  const arr = (''+dfId).split('/')
  , id = arr.pop()
  , prefix = arr.join('__');
  return prefix && id
    ? `StatFin__${prefix}/${id}`
    : '';
};

const _crSearchLink = (
  label,
  option
) => {
  const _token = _crSearchToken(label);
  switch(option.loadId){
    case 'NST': case 'NST_2':
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

const _crDescr = (
  option,
  json
) => {
  const _date = (getDatasetUpdated(json) || '')
    .replace('T', ' ')
    .replace('Z', '')
  , { dfId } = option
  , _elSearchLink = _crSearchLink(getDatasetLabel(json), option)
  , _source = getDatasetSource(json);

  return dfId && _source
    ? `TableId: ${dfId}<BR/>${_source}: ${_date}<BR/>${_elSearchLink}`
    : _elSearchLink;
};

const _crItemCaption = ({
  items,
  dfId
}) => `${dfId || 'id'}_${(items[0] || {}).caption || 'All Items'}`;

const _crDataSource = ({
  dataSource,
  dfId
}) => dfId
 && (''+dfId).length < MAX_SOURCE_ID_LENGTH
   ? `${dataSource} (${dfId})`
   : dataSource;


export const crTitle = (
  option
) => {
  switch(option.browserType){
    case 'NST':
    case 'NST_ALL':
      return TITLE_NST;
    case 'SWS':
    case 'SWS_ALL':
      return TITLE_SWS;
    case 'ES':
      return joinByColon(option.title, option.subtitle)
    default:
      return '';
  }
}

export const crInfo = (
  option,
  json
) => ({
  name: getDatasetLabel(json) || '',
  description: _crDescr(option, json)
})

export const crZhConfig = (
  option
) => {
  const {
    _itemKey,
    url,
    optionFetch,
    items,
    dataSource,
    dfId,
    timeId
  } = option
  , key = _itemKey || crId()
  , itemCaption = option.itemCaption || _crItemCaption(option)
  , itemConf = url
     ? {
       _itemKey: key,
       ...crItemConf(option),
       optionFetch, items,
       dataSource,
       //sfl
       dfId, timeId
      }
    : void 0;
  return {
    id: key,
    key,
    itemCaption,
    itemConf,
    dataSource: _crDataSource(option)
  };
}

export const crConfOption = (
  option,
  json
) => ({
  info: crInfo(option, json),
  zhConfig: crZhConfig(option)
})

export const crChartOption = (
  data,
  option,
  json
) => ({
  valueMoving: valueMoving(data),
  ...crConfOption(option, json)
})
