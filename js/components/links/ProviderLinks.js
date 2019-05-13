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

var CL_LINK = "data-provider-link";

var S = {
  ORANGE: {
    color: "#e05927"
  },
  SUNNY: {
    color: "#ffa200"
  },
  DARK_GREEN: {
    //color: '#abd9bf'
    //color: '#4f7061'
    color: '#12323d'
  },
  COMPARE: {
    color: '#49d87c'
  }
};

var LINK_CONFIGS = [["Quandl", "Quandl", "https://www.quandl.com/", S.ORANGE], ["DbNomics", "DB NOMICS", "https://db.nomics.world/", S.DARK_GREEN], ["Iex", "IEX Platform", "https://iextrading.com/developer/", S.SUNNY], ["Cmc", "CoinMarketCap", "https://coinmarketcap.com/"], ["Barchart", "Barchart Market Data", "https://www.barchartmarketdata.com"], ["AlphaVantage", "Alpha Vantage", "https://www.alphavantage.co"], ["Eurostat", "Eurostat", "http://ec.europa.eu/eurostat"], ["UnComtrade", "UN Comtrade", "https://comtrade.un.org"], ["WorldBank", "World Bank", "https://data.worldbank.org/"], ["FaoStat", "FAOSTAT", "http://www.fao.org/faostat/en/#data"], ["Bea", "U.S. Bureau of Economic Analysis", "https://www.bea.gov/index.htm"], ["Bsl", "U.S. Bureau of Labor Statistics", "https://www.bls.gov/home.htm"], ["Eia", "U.S. EIA", "https://www.eia.gov/"], ["Intrinio", 'Intrinio', "https://intrinio.com"], ["Insee", "Insee: France Statistics", "https://www.insee.fr/en/accueil"], ["StatNorway", "Statistics Norway", "https://www.ssb.no/en"], ["StatSweden", "Statistics Sweden", "https://www.scb.se/en/"], ["StatFinland", "Statistics Finland", "https://www.stat.fi/index_en.html"]];

var _crLinkProps = function _crLinkProps(title, href, dfStyle) {
  return {
    className: CL_LINK,
    title: title, href: href, dfStyle: dfStyle
  };
};

var Links = {
  CryptoCompare: function CryptoCompare() {
    return _react2.default.createElement(
      _Link2.default,
      {
        className: CL_LINK,
        href: 'https://www.cryptocompare.com/',
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