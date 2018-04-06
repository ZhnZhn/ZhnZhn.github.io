'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
var BrowserType = exports.BrowserType = {
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
   NBSC: 'NBSC',

   PREMIUM_SAMPLE: 'QPS',
   ECONOMIC: 'QE',

   US_STOCKS: 'QUS',
   NYSE_STOCKS: 'NS',
   NASDAQ_STOCKS: 'NQS',
   LONDON_STOCKS: 'LS',

   STOCKS_BY_SECTORS: 'STOCKS_BY_SECTORS',

   US_ECONOMY: 'USAE',

   BLOCKCHAIN: 'BC',

   WATCH_LIST: 'WL'
};

var Direction = exports.Direction = {
   UP: 'up',
   DOWN: 'down',
   EQUAL: 'equal',
   EMPTY: 'empty'
};

var ModalDialog = exports.ModalDialog = {
   ASK: 'ASK',
   RELOAD: 'RELOAD',
   INFO: 'info',
   ALERT: 'alert',
   DESCRIPTION: 'DESCRIPTION',
   SETTINGS: 'settings',
   CUSTOMIZE_EXPORT: 'CUSTOMIZE_EXPORT',
   ADD_TO_WATCH: 'addToWatch',
   LOAD_ITEM: 'loadItem',
   US_STOCK_BY_SECTOR: 'US_STOCK_BY_SECTOR',
   STOCKS_BY_SECTOR: 'STOCKS_BY_SECTOR',
   EDIT_WATCH_GROUP: 'editWatchGroup',
   EDIT_WATCH_LIST: 'editWatchList',
   PASTE_TO: 'pasteTo'
};

var ChartType = exports.ChartType = {
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

var LoadType = exports.LoadType = {
   Q: 'Q',
   B: 'B',
   AL: 'AL',
   AL_S: 'AL_S',
   AL_I: 'AL_I',
   IEX: 'IEX',
   QCT: 'QCT',
   EU_STAT: 'EU_STAT',
   FS: 'FS',
   NST: 'NST',
   NST_2: 'NST_2',
   SWS: 'SWS',
   UN: 'UN',
   FAO: 'FAO',
   WB: 'WB',
   BEA: 'BEA',
   BLS: 'BLS',
   INTR: 'INTR',
   CRC: 'CRC',
   CMC: 'CMC',
   WL: 'WL'
};

var CompItemType = exports.CompItemType = {
   CHART_AREA: 'CHART_AREA',
   EUROSTAT_MAP: 'EUROSTAT_MAP',
   //SECTOR: 'SECTOR',
   COIN_INFO: 'COIN_INFO',
   TABLE: 'TABLE',
   ALPHA_PERF: 'ALPHA_PERF'
};
//# sourceMappingURL=Type.js.map