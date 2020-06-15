
import fns from './toFns'

const { getValue, toStr, toPerc } = fns;
const _isFn = fn => typeof fn === 'function';
const _isNumber = n => typeof n === 'number';

//const _crCompanyName = ({ companyName }) => companyName || '';
const _crEarningsDate = ({ nextEarningsDate }) => nextEarningsDate
  ?  'nextEarningsDate: ' + nextEarningsDate
  :  '';
const _fNameValue = propName =>
  json => _isNumber(json[propName])
    ? propName + ': ' + toStr(json[propName])
    : '';
const _crConfig = str => _isFn(str)
  ? str
  : _fNameValue(str);

const toStatsImpl = {
  CONFIGS: [
    //_crCompanyName,
    "sharesOutstanding",
    "float",
    "employees",
    "ttmEPS",  // 12 month tralling
    "ttmDividendRate",
    "dividendYield",
    "peRatio",
    "beta",
    _crEarningsDate
  ].map(_crConfig),

  crCaption: ({ marketcap }, { item }) =>
     getValue(item) + ': ' + toStr(marketcap),
  crTokensName: ({ companyName }) => companyName || '',
  crDescrName: () => 'ChangePercent',
  crDescrStyle: () => ({
    fontWeight: 'bold',
    whiteSpace: 'pre'
  }),
  crDescr: json => `  5Y: ${toPerc(json.year5ChangePercent)}
  2Y: ${toPerc(json.year2ChangePercent)}
  1Y: ${toPerc(json.year1ChangePercent)}
  YTD: ${toPerc(json.ytdChangePercent)}\n
  6M: ${toPerc(json.month6ChangePercent)}
  3M: ${toPerc(json.month3ChangePercent)}
  1M: ${toPerc(json.month1ChangePercent)}
  5D: ${toPerc(json.day5ChangePercent)}`
};

export default toStatsImpl
