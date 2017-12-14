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
  BROWN: {
    color: "#bd1010"
  }
};

var Quandl = (0, _withProps2.default)({
  className: CL_LINK,
  href: "https://www.quandl.com/",
  style: { color: "#E05927" },
  title: "Quandl"
})(_Link2.default);

var Barchart = (0, _withProps2.default)({
  className: CL_LINK,
  href: "https://www.barchartmarketdata.com",
  style: S.BROWN,
  title: "Barchart Market Data"
})(_Link2.default);

var AlphaVantage = (0, _withProps2.default)({
  className: CL_LINK,
  href: "https://www.alphavantage.co",
  style: S.BLUE,
  title: "Alpha Vantage"
})(_Link2.default);

var Eurostat = (0, _withProps2.default)({
  className: CL_LINK,
  href: "http://ec.europa.eu/eurostat",
  style: S.BLUE,
  title: "Eurostat"
})(_Link2.default);

var UnComtrade = (0, _withProps2.default)({
  className: CL_LINK,
  href: "https://comtrade.un.org",
  style: S.BLUE,
  title: "UN Comtrade"
})(_Link2.default);

var FaoStat = (0, _withProps2.default)({
  className: CL_LINK,
  href: "http://www.fao.org/faostat/en/#data",
  style: S.BLUE,
  title: "FAOSTAT"
})(_Link2.default);

var Insee = (0, _withProps2.default)({
  className: CL_LINK,
  href: "https://www.insee.fr/en/accueil",
  style: S.BLUE,
  title: "Insee: France Statistics"
})(_Link2.default);

var StatNorway = (0, _withProps2.default)({
  className: CL_LINK,
  href: "http://www.ssb.no/en",
  style: S.BLUE,
  title: "Statistics Norway"
})(_Link2.default);

var StatSweden = (0, _withProps2.default)({
  className: CL_LINK,
  href: "https://www.scb.se/en/",
  style: S.BLUE,
  title: "Statistics Sweden"
})(_Link2.default);

exports.default = {
  Quandl: Quandl,
  Barchart: Barchart,
  AlphaVantage: AlphaVantage,
  Eurostat: Eurostat,
  UnComtrade: UnComtrade,
  FaoStat: FaoStat,
  Insee: Insee,
  StatNorway: StatNorway,
  StatSweden: StatSweden
};
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\links\Links.js.map