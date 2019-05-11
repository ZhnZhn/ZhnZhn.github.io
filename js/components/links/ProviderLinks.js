'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _withProps = require('../hoc/withProps');

var _withProps2 = _interopRequireDefault(_withProps);

var _Link = require('../zhn/Link');

var _Link2 = _interopRequireDefault(_Link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CL_LINK = "descr__quandl-link";

var S = {
  BLUE: {
    color: "#009ae5"
  },
  ORANGE: {
    color: "#e05927"
  },
  SUNNY: {
    color: "#ffa200"
  },
  WHITE: {
    //color: 'white'
    //color: '#4f5c8e'
    color: '#009ae5'
  },
  DBNOMICS: {
    //color: '#abd9bf'
    //color: '#4f7061'
    color: '#12323d'
  },
  COMPARE: {
    color: '#49d87c'
  }
};

var LINK_CONFIGS = [["Quandl", "Quandl", S.ORANGE, "https://www.quandl.com/"], ["DbNomics", "DB NOMICS", S.DBNOMICS, "https://db.nomics.world/"], ["Iex", "IEX Platform", S.SUNNY, "https://iextrading.com/developer/"], ["Cmc", "CoinMarketCap", S.BLUE, "https://coinmarketcap.com/"], ["Barchart", "Barchart Market Data", S.BLUE, "https://www.barchartmarketdata.com"], ["AlphaVantage", "Alpha Vantage", S.BLUE, "https://www.alphavantage.co"], ["Eurostat", "Eurostat", S.BLUE, "http://ec.europa.eu/eurostat"], ["UnComtrade", "UN Comtrade", S.BLUE, "https://comtrade.un.org"], ["WorldBank", "World Bank", S.BLUE, "https://data.worldbank.org/"], ["FaoStat", "FAOSTAT", S.BLUE, "http://www.fao.org/faostat/en/#data"], ["Bea", "U.S. Bureau of Economic Analysis", S.WHITE, "https://www.bea.gov/index.htm"], ["Bsl", "U.S. Bureau of Labor Statistics", S.WHITE, "https://www.bls.gov/home.htm"], ["Eia", "U.S. EIA", S.WHITE, "https://www.eia.gov/"], ["Intrinio", 'Intrinio', S.WHITE, "https://intrinio.com"], ["Insee", "Insee: France Statistics", S.BLUE, "https://www.insee.fr/en/accueil"], ["StatNorway", "Statistics Norway", S.BLUE, "https://www.ssb.no/en"], ["StatSweden", "Statistics Sweden", S.BLUE, "https://www.scb.se/en/"], ["StatFinland", "Statistics Finland", S.BLUE, "https://www.stat.fi/index_en.html"]];

var _crLinkProps = function _crLinkProps(title, dfStyle, href) {
  return {
    className: CL_LINK,
    title: title, dfStyle: dfStyle, href: href
  };
};

var Links = {
  CryptoCompare: function CryptoCompare() {
    return _react2.default.createElement(
      _Link2.default,
      {
        className: CL_LINK,
        href: 'https://www.cryptocompare.com/',
        dfStyle: S.WHITE,
        title: 'Crypto'
      },
      _react2.default.createElement(
        'span',
        { style: S.COMPARE },
        'Compare'
      )
    );
  }
};

LINK_CONFIGS.forEach(function (conf) {
  Links[conf[0]] = (0, _withProps2.default)(_crLinkProps(conf[1], conf[2], conf[3]))(_Link2.default);
});

exports.default = Links;
//# sourceMappingURL=ProviderLinks.js.map