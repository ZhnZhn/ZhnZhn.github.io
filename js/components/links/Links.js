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

var Quandl = (0, _withProps2.default)({
  className: CL_LINK,
  href: "https://www.quandl.com/",
  style: { color: "#E05927" },
  title: "Quandl"
})(_Link2.default);

var Barchart = (0, _withProps2.default)({
  className: CL_LINK,
  href: "https://www.barchartmarketdata.com",
  style: { color: "#bd1010" },
  title: "Barchart Market Data"
})(_Link2.default);

var AlphaVantage = (0, _withProps2.default)({
  className: CL_LINK,
  href: "https://www.alphavantage.co",
  style: { color: "#009ae5" },
  title: "Alpha Vantage"
})(_Link2.default);

var Eurostat = (0, _withProps2.default)({
  className: CL_LINK,
  href: "http://ec.europa.eu/eurostat",
  style: { color: "#009ae5" },
  title: "Eurostat"
})(_Link2.default);

var Insee = (0, _withProps2.default)({
  className: CL_LINK,
  href: "https://www.insee.fr/en/accueil",
  style: { color: "#009ae5" },
  title: "Insee: France Statistics"
})(_Link2.default);

exports.default = {
  Quandl: Quandl,
  Barchart: Barchart,
  AlphaVantage: AlphaVantage,
  Eurostat: Eurostat,
  Insee: Insee
};
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\links\Links.js.map