'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Type = require('../../constants/Type');

var _ComponentActions = require('../../flux/actions/ComponentActions');

var _ComponentActions2 = _interopRequireDefault(_ComponentActions);

var _BrowserActions = require('../../flux/actions/BrowserActions');

var _BrowserActions2 = _interopRequireDefault(_BrowserActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CL_ROW = 'row__pane-topic';

var CL = {
  BR: CL_ROW + ' item__browser',
  Q: CL_ROW + ' item__quandl',
  EU: CL_ROW + ' item__eurostat',
  W: CL_ROW + ' item__watch',
  AB: CL_ROW + ' item__about'
};

var _fBD = function _fBD(id) {
  return function () {
    _BrowserActions2.default.showBrowserDynamic(id);
  };
};
var _fB = function _fB(id) {
  return function () {
    _BrowserActions2.default.showBrowser(id);
  };
};

var crBrowserModel = function crBrowserModel() {
  return {
    baseTitleCl: CL.BR,
    pageWidth: 235,
    maxPages: 2,
    page_0: [{
      id: 'page_01',
      type: 'sub',
      cn: CL.BR,
      name: 'Economics'
    }, {
      id: 'page_02',
      type: 'sub',
      cn: CL.BR,
      name: 'Statistics Agencies'
    }, {
      id: 'page_03',
      type: 'sub',
      cn: CL.BR,
      name: 'Stock Markets'
    }, {
      cn: CL.EU,
      name: 'UN Comtrade',
      onClick: _fBD(_Type.BrowserType.UN_COMTRADE),
      isClose: true
    }, {
      cn: CL.EU,
      name: 'FAOSTAT',
      onClick: _fBD(_Type.BrowserType.FAOSTAT),
      isClose: true
    }, {
      cn: CL.EU,
      name: 'World Bank',
      onClick: _fBD(_Type.BrowserType.WORLD_BANK),
      isClose: true
    }, {
      cn: CL.BR,
      name: 'Blockchain',
      onClick: _fBD(_Type.BrowserType.BLOCKCHAIN),
      isClose: true
    }, {
      name: 'Quandl Premium Sample',
      cn: CL.Q,
      onClick: _fBD(_Type.BrowserType.PREMIUM_SAMPLE),
      isClose: true
    }, {
      cn: CL.W,
      name: 'Watch List',
      onClick: _fBD(_Type.BrowserType.WATCH_LIST),
      isClose: true
    }, {
      cn: CL.AB,
      name: 'About',
      onClick: _ComponentActions2.default.showAbout,
      isClose: true
    }],
    page_01: [{
      cn: CL.Q,
      name: 'World Economy',
      onClick: _fB(_Type.BrowserType.ECONOMIC),
      isClose: true
    }, {
      cn: CL.BR,
      name: 'U.S. Economy',
      onClick: _fBD(_Type.BrowserType.US_ECONOMY),
      isClose: true
    }],
    page_02: [{
      cn: CL.EU,
      name: 'Eurostat',
      onClick: _fBD(_Type.BrowserType.EUROSTAT),
      isClose: true
    }, {
      cn: CL.EU,
      name: 'Insee: France Statistics',
      onClick: _fBD(_Type.BrowserType.FRANCE_STATISTICS),
      isClose: true
    }, {
      cn: CL.EU,
      name: 'Statistics Norway',
      onClick: _fBD(_Type.BrowserType.NORWAY_STATISTICS),
      isClose: true
    }, {
      cn: CL.EU,
      name: 'Statistics Norway All',
      onClick: _fBD(_Type.BrowserType.NORWAY_STAT_ALL),
      isClose: true
    }, {
      cn: CL.EU,
      name: 'Statistics Sweden',
      onClick: _fBD(_Type.BrowserType.SWEDEN_STAT),
      isClose: true
    }, {
      cn: CL.EU,
      name: 'Statistics Sweden All',
      onClick: _fBD(_Type.BrowserType.SWEDEN_STAT_ALL),
      isClose: true
    }, {
      cn: CL.Q,
      name: 'NBS China (Monthly)',
      onClick: _fBD(_Type.BrowserType.NBSC),
      isClose: true
    }],
    page_03: [{
      cn: CL.BR,
      name: 'Stock Markets',
      onClick: _fBD(_Type.BrowserType.STOCK_MARKETS),
      isClose: true
    }, {
      cn: CL.Q,
      name: 'NYSE by Sectors',
      onClick: _fBD(_Type.BrowserType.NYSE_STOCKS),
      isClose: true
    }, {
      cn: CL.Q,
      name: 'NASDAQ by Sectors',
      onClick: _fBD(_Type.BrowserType.NASDAQ_STOCKS),
      isClose: true
    }, {
      cn: CL.Q,
      name: '1000 Stocks by Sectors',
      onClick: _fBD(_Type.BrowserType.US_STOCKS),
      isClose: true
    }, {
      cn: CL.Q,
      name: 'LSE (Not Updated)',
      onClick: _fBD(_Type.BrowserType.LONDON_STOCKS),
      isClose: true
    }]
  };
};

exports.default = crBrowserModel;
//# sourceMappingURL=BrowserModel.js.map