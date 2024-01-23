import {
  fCrDfUrl,
  fCrObUrl,
  fRouteApi
} from '../ApiFn';

const HTTPS = 'https://'
, BINANCE_COM = 'binance.com'
, API_URL = `${HTTPS}api.${BINANCE_COM}/api/v3`
, RESEARCH_URL = `${HTTPS}research.${BINANCE_COM}/en/projects`
, TRADE_URL = `${HTTPS}${BINANCE_COM}/en/trade`;

const REG_BLANKS = /\s/g;

const _setLinks = (
  option,
  c='',
  pair=''
) => {
  const _toIndex = c.indexOf('(')
  , _caption = c.slice(0, _toIndex)
      .trim()
      .toLowerCase()
      .replace(REG_BLANKS, '-')
  , _pair = pair.replace('/', '_');
  option._researchLink = `${RESEARCH_URL}/${_caption}`
  option._tradeLink = `${TRADE_URL}/${_pair}`
};

const _crSymbol = pair => (pair || '').replace('/','');

const _crDfUrl = (
  pair,
  timeframe,
  limit,
  option,
  items
) => {
  _setLinks(option, items[0].c, pair)
  return `${API_URL}/klines?symbol=${_crSymbol(pair)}&interval=${timeframe}&limit=${limit}`;
};

const _crObUrl = (
  pair,
  limit
) => `${API_URL}/depth?symbol=${_crSymbol(pair)}&limit=${limit}`;

const _rCrUrl = {
  DF: fCrDfUrl(_crDfUrl),
  OB: fCrObUrl(_crObUrl)
};

const BnApi = fRouteApi(_rCrUrl);

export default BnApi
