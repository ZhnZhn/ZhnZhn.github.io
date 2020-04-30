"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _Type = require("../../constants/Type");

var _ComponentActions = _interopRequireDefault(require("../../flux/actions/ComponentActions"));

var _BrowserActions = _interopRequireDefault(require("../../flux/actions/BrowserActions"));

var CL_ROW = 'row__pane-topic';
var CL = {
  BR: CL_ROW + " item__browser",
  Q: CL_ROW + " item__quandl",
  DBN: CL_ROW + " item__dbnomics",
  ORG: CL_ROW + " item__org",
  W: CL_ROW + " item__watch",
  AB: CL_ROW + " item__about"
};

var _fBD = function _fBD(id) {
  return function () {
    _BrowserActions["default"].showBrowserDynamic(id);
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
      id: 'page_04',
      type: 'sub',
      cn: CL.BR,
      name: 'World Organizations'
    }, {
      cn: CL.BR,
      name: 'Futures Markets',
      onClick: _fBD(_Type.BrowserType.FUTURES),
      isClose: true
    }, {
      cn: CL.BR,
      name: 'Blockchain',
      onClick: _fBD(_Type.BrowserType.BLOCKCHAIN),
      isClose: true
    }, {
      cn: CL.W,
      name: 'Watch List',
      onClick: _fBD(_Type.BrowserType.WATCH_LIST),
      isClose: true
    }, {
      cn: CL.AB,
      name: 'About',
      onClick: _ComponentActions["default"].showAbout,
      isClose: true
    }],
    page_01: [{
      cn: CL.BR,
      name: 'USA Economics',
      onClick: _fBD(_Type.BrowserType.US_ECONOMICS),
      isClose: true
    }, {
      cn: CL.DBN,
      name: 'DB Nomics',
      onClick: _fBD(_Type.BrowserType.DB_NOMICS),
      isClose: true
    }, {
      cn: CL.Q,
      name: 'Quandl',
      onClick: _fBD(_Type.BrowserType.QUANDL),
      isClose: true
    }],
    page_02: [{
      cn: CL.ORG,
      name: 'Eurostat',
      onClick: _fBD(_Type.BrowserType.EUROSTAT),
      isClose: true
    }, {
      cn: CL.ORG,
      name: 'Insee: France Statistics',
      onClick: _fBD(_Type.BrowserType.FRANCE_STATISTICS),
      isClose: true
    }, {
      cn: CL.ORG,
      name: 'Statistics Norway',
      onClick: _fBD(_Type.BrowserType.NORWAY_STATISTICS),
      isClose: true
    }, {
      cn: CL.ORG,
      name: 'Statistics Norway All',
      onClick: _fBD(_Type.BrowserType.NORWAY_STAT_ALL),
      isClose: true
    }, {
      cn: CL.ORG,
      name: 'Statistics Sweden',
      onClick: _fBD(_Type.BrowserType.SWEDEN_STAT),
      isClose: true
    }, {
      cn: CL.ORG,
      name: 'Statistics Sweden All',
      onClick: _fBD(_Type.BrowserType.SWEDEN_STAT_ALL),
      isClose: true
    }, {
      cn: CL.ORG,
      name: 'Statistics Finland All',
      onClick: _fBD(_Type.BrowserType.FINLAND_STAT_ALL),
      isClose: true
    }],
    page_03: [{
      cn: CL.BR,
      name: 'Stock Markets',
      onClick: _fBD(_Type.BrowserType.STOCK_MARKETS),
      isClose: true
    }, {
      cn: CL.BR,
      name: 'NYSE by Sectors',
      onClick: _fBD(_Type.BrowserType.NYSE_STOCKS),
      isClose: true
    }, {
      cn: CL.BR,
      name: 'NASDAQ by Sectors',
      onClick: _fBD(_Type.BrowserType.NASDAQ_STOCKS),
      isClose: true
    }],
    page_04: [{
      cn: CL.ORG,
      name: 'FAOSTAT',
      onClick: _fBD(_Type.BrowserType.FAOSTAT),
      isClose: true
    }, {
      cn: CL.ORG,
      name: 'UN Comtrade',
      onClick: _fBD(_Type.BrowserType.UN_COMTRADE),
      isClose: true
    }, {
      cn: CL.ORG,
      name: 'World Bank',
      onClick: _fBD(_Type.BrowserType.WORLD_BANK),
      isClose: true
    }]
  };
};

var _default = crBrowserModel;
exports["default"] = _default;
//# sourceMappingURL=BrowserModel.js.map