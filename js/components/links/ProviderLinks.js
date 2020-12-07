"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _Link = _interopRequireDefault(require("../zhn/Link"));

var CL_LINK = "data-provider-link";
var S = {
  ORANGE: {
    color: "#e05927"
  },
  DARK_GREEN: {
    color: '#12323d'
  },
  COMPARE: {
    color: '#49d87c'
  }
};
var LINK_CONFIGS = [["Quandl", "Quandl", "https://www.quandl.com", S.ORANGE], ["DbNomics", "DB NOMICS", "https://db.nomics.world", S.DARK_GREEN], ["Iex", "IEX Cloud", "https://iexcloud.io"], ["Fmp", "Financial Modeling Prep", "https://financialmodelingprep.com"], ["Barchart", "Barchart Market Data", "https://www.barchartmarketdata.com"], ["AlphaVantage", "Alpha Vantage", "https://www.alphavantage.co"], ["Eurostat", "Eurostat", "http://ec.europa.eu/eurostat/"], ["UnComtrade", "UN Comtrade", "https://comtrade.un.org"], ["WorldBank", "World Bank", "https://data.worldbank.org"], ["FaoStat", "FAOSTAT", "http://www.fao.org/faostat/en/#data"], ["Bea", "U.S. Bureau of Economic Analysis", "https://www.bea.gov/index.htm"], ["Bsl", "U.S. Bureau of Labor Statistics", "https://www.bls.gov/home.htm"], ["Eia", "U.S. EIA", "https://www.eia.gov"], ["Intrinio", 'Intrinio', "https://intrinio.com"], ["Insee", "Insee: France Statistics", "https://www.insee.fr/en/accueil/"], ["ONS", "ONS: UK Statistics", "https://www.ons.gov.uk"], ["StatNorway", "Statistics Norway", "https://www.ssb.no/en/"], ["StatSweden", "Statistics Sweden", "https://www.scb.se/en/"], ["StatFinland", "Statistics Finland", "https://www.stat.fi/index_en.html"], ["CoinGecko", "CoinGecko", "https://www.coingecko.com/en/"], ["CoinMetrics", "CoinMetrics", "https://coinmetrics.io"], ["Coinpaprika", "Coinpaprika", "https://coinpaprika.com/"], ["Binance", "Binance", "https://binance.com/"], ["Bitstamp", "Bitstamp", "https://www.bitstamp.net/"]];
var Links = {
  CryptoCompare: function CryptoCompare() {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Link["default"], {
      className: CL_LINK,
      href: "https://www.cryptocompare.com/",
      title: "Crypto",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        style: S.COMPARE,
        children: "Compare"
      })
    });
  }
};
LINK_CONFIGS.forEach(function (conf) {
  Links[conf[0]] = function () {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Link["default"], {
      className: CL_LINK,
      title: conf[1],
      href: conf[2],
      dfStyle: conf[3]
    });
  };
});
var _default = Links;
exports["default"] = _default;
//# sourceMappingURL=ProviderLinks.js.map