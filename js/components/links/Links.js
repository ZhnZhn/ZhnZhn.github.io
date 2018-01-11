'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _withProps = require('../hoc/withProps');

var _withProps2 = _interopRequireDefault(_withProps);

var _Link = require('../zhn/Link');

var _Link2 = _interopRequireDefault(_Link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CL_LINK = "descr__quandl-link";

var S = {
  BLUE: {
    //whiteSpace: "nowrap",
    color: "#009ae5"
  },
  ORANGE: {
    color: "#e05927"
  },
  SUNNY: {
    color: "#ffa200"
  },
  WHITE: {
    color: 'white'
  }
};

var Quandl = (0, _withProps2.default)({
  className: CL_LINK,
  href: "https://www.quandl.com/",
  dfStyle: S.ORANGE,
  title: "Quandl"
})(_Link2.default);

var Iex = (0, _withProps2.default)({
  className: CL_LINK,
  href: "https://iextrading.com/developer/",
  dfStyle: S.SUNNY,
  title: "IEX Platform"
})(_Link2.default);

var Barchart = (0, _withProps2.default)({
  className: CL_LINK,
  href: "https://www.barchartmarketdata.com",
  dfStyle: S.BLUE,
  title: "Barchart Market Data"
})(_Link2.default);

var AlphaVantage = (0, _withProps2.default)({
  className: CL_LINK,
  href: "https://www.alphavantage.co",
  dfStyle: S.BLUE,
  title: "Alpha Vantage"
})(_Link2.default);

var Eurostat = (0, _withProps2.default)({
  className: CL_LINK,
  href: "http://ec.europa.eu/eurostat",
  dfStyle: S.BLUE,
  title: "Eurostat"
})(_Link2.default);

var UnComtrade = (0, _withProps2.default)({
  className: CL_LINK,
  href: "https://comtrade.un.org",
  dfStyle: S.BLUE,
  title: "UN Comtrade"
})(_Link2.default);

var FaoStat = (0, _withProps2.default)({
  className: CL_LINK,
  href: "http://www.fao.org/faostat/en/#data",
  dfStyle: S.BLUE,
  title: "FAOSTAT"
})(_Link2.default);

var Bea = (0, _withProps2.default)({
  className: CL_LINK,
  href: "https://www.bea.gov/index.htm",
  dfStyle: S.WHITE,
  title: "U.S. Bureau of Economic Analysis"
})(_Link2.default);

var Intrinio = (0, _withProps2.default)({
  className: CL_LINK,
  href: "https://intrinio.com",
  dfStyle: S.WHITE,
  title: 'Intrinio'
})(_Link2.default);

var Insee = (0, _withProps2.default)({
  className: CL_LINK,
  href: "https://www.insee.fr/en/accueil",
  dfStyle: S.BLUE,
  title: "Insee: France Statistics"
})(_Link2.default);

var StatNorway = (0, _withProps2.default)({
  className: CL_LINK,
  href: "http://www.ssb.no/en",
  dfStyle: S.BLUE,
  title: "Statistics Norway"
})(_Link2.default);

var StatSweden = (0, _withProps2.default)({
  className: CL_LINK,
  href: "https://www.scb.se/en/",
  dfStyle: S.BLUE,
  title: "Statistics Sweden"
})(_Link2.default);

exports.default = {
  Quandl: Quandl,
  Iex: Iex,
  Barchart: Barchart,
  AlphaVantage: AlphaVantage,
  Eurostat: Eurostat,
  UnComtrade: UnComtrade,
  FaoStat: FaoStat,
  Bea: Bea,
  Intrinio: Intrinio,
  Insee: Insee,
  StatNorway: StatNorway,
  StatSweden: StatSweden
};
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\links\Links.js.map