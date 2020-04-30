"use strict";

exports.__esModule = true;
exports.CompItemType = exports.LoadType = exports.ChartType = exports.ModalDialog = exports.Direction = exports.BrowserType = void 0;
var BrowserType = {
  STOCK_MARKETS: 'SM',
  EUROSTAT: 'ES',
  UN_COMTRADE: 'UN',
  FAOSTAT: 'FAO',
  WORLD_BANK: 'WB',
  FRANCE_STATISTICS: 'FS',
  NORWAY_STATISTICS: 'NST',
  NORWAY_STAT_ALL: 'NST_ALL',
  SWEDEN_STAT: 'SWS',
  SWEDEN_STAT_ALL: 'SWS_ALL',
  FINLAND_STAT_ALL: 'SFL',
  QUANDL: 'QE',
  NYSE_STOCKS: 'NS',
  NASDAQ_STOCKS: 'NQS',
  STOCKS_BY_SECTORS: 'STOCKS_BY_SECTORS',
  DB_NOMICS: 'DBN',
  US_ECONOMICS: 'USAE',
  BLOCKCHAIN: 'BC',
  FUTURES: 'FT',
  WATCH_LIST: 'WL'
};
exports.BrowserType = BrowserType;
var Direction = {
  UP: 'up',
  DOWN: 'down',
  EQUAL: 'equal',
  EMPTY: 'empty'
};
exports.Direction = Direction;
var ModalDialog = {
  ASK: 'ASK',
  RELOAD: 'RELOAD',
  INFO: 'info',
  ALERT: 'alert',
  DESCRIPTION: 'DESCRIPTION',
  SETTINGS: 'settings',
  CUSTOMIZE_EXPORT: 'CUSTOMIZE_EXPORT',
  COLUMN_RANGE: 'COLUMN_RANGE',
  ADD_TO_WATCH: 'addToWatch',
  LOAD_ITEM: 'loadItem',
  US_STOCK_BY_SECTOR: 'US_STOCK_BY_SECTOR',
  STOCKS_BY_SECTOR: 'STOCKS_BY_SECTOR',
  EDIT_WATCH_GROUP: 'editWatchGroup',
  EDIT_WATCH_LIST: 'editWatchList',
  PASTE_TO: 'pasteTo',
  ZOOM: 'zoom'
};
exports.ModalDialog = ModalDialog;
var ChartType = {
  AREA: 'AREA',
  SEMI_DONUT: 'SEMI_DONUT',
  STACKED_AREA: 'STACKED_AREA',
  STACKED_AREA_PERCENT: 'STACKED_AREA_PERCENT',
  STACKED_COLUMN: 'STACKED_COLUMN',
  STACKED_COLUMN_PERCENT: 'STACKED_COLUMN_PERCENT',
  TREE_MAP: 'TREE_MAP',
  YEARLY: 'YEARLY',
  SCATTER: 'SCATTER',
  SCATTER_UP: 'SCATTER_UP',
  SCATTER_DOWN: 'SCATTER_DOWN'
};
exports.ChartType = ChartType;
var LoadType = {
  Q: 'Q',
  B: 'B',
  AL: 'AL',
  AL_S: 'AL_S',
  AL_I: 'AL_I',
  IEX: 'IEX',
  FMP: 'FMP',
  QCT: 'QCT',
  DBN: 'DBN',
  EU_STAT: 'EU_STAT',
  FS: 'FS',
  NST: 'NST',
  NST_2: 'NST_2',
  SWS: 'SWS',
  SFL: 'SFL',
  UN: 'UN',
  FAO: 'FAO',
  WB: 'WB',
  BEA: 'BEA',
  BLS: 'BLS',
  EIA: 'EIA',
  INTR: 'INTR',
  CRC: 'CRC',
  CG: 'CG',
  WL: 'WL'
};
exports.LoadType = LoadType;
var CompItemType = {
  CHART_AREA: 'CHART_AREA',
  EUROSTAT_MAP: 'EUROSTAT_MAP',
  COIN_INFO: 'COIN_INFO',
  TABLE: 'TABLE',
  ALPHA_PERF: 'ALPHA_PERF',
  FLEX_TOKENS: 'FLEX_TOKENS'
};
exports.CompItemType = CompItemType;
//# sourceMappingURL=Type.js.map