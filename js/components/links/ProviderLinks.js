"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _Link = _interopRequireDefault(require("../zhn/Link"));

var _jsxRuntime = require("react/jsx-runtime");

const CL_LINK = "data-provider-link";
const S_ORANGE = {
  color: "#e05927"
},
      S_DARK_GREEN = {
  color: '#12323d'
},
      S_COMPARE = {
  color: '#49d87c'
};
const LINK_CONFIGS = [["Quandl", "https://www.quandl.com", S_ORANGE], ["DbNomics", "DB NOMICS", "https://db.nomics.world", S_DARK_GREEN], ["Ember", "https://ember-climate.org"], ["Iex", "IEX Cloud", "https://iexcloud.io"], ["Fmp", "Financial Modeling Prep", "https://financialmodelingprep.com"], ["Tw", "Twelve Data", "https://twelvedata.com"], ["AlphaVantage", "Alpha Vantage", "https://www.alphavantage.co"], ["Eurostat", "https://ec.europa.eu/eurostat/"], ["UnComtrade", "UN Comtrade", "https://comtrade.un.org"], ["WorldBank", "World Bank", "https://data.worldbank.org"], ["FaoStat", "FAOSTAT", "http://www.fao.org/faostat/en/#data"], ["Bea", "U.S. Bureau of Economic Analysis", "https://www.bea.gov/index.htm"], ["Bsl", "U.S. Bureau of Labor Statistics", "https://www.bls.gov/home.htm"], ["Eia", "U.S. EIA", "https://www.eia.gov"], ["Intrinio", "https://intrinio.com"], ["Insee", "Insee: France Statistics", "https://www.insee.fr/en/accueil/"], ["ONS", "ONS: UK Statistics", "https://www.ons.gov.uk"], ["StatNorway", "Statistics Norway", "https://www.ssb.no/en/"], ["StatSweden", "Statistics Sweden", "https://www.scb.se/en/"], ["StatFinland", "Statistics Finland", "https://www.stat.fi/index_en.html"], ["StatDenmark", "Statistics Denmark", "https://www.dst.dk/en/"], ["StatIreland", "CSO Ireland", "https://www.cso.ie/en/"], ["CoinGecko", "https://www.coingecko.com/en/"], ["CoinMetrics", "https://coinmetrics.io"], ["CoinLore", "https://www.coinlore.com"], ["Coinpaprika", "https://coinpaprika.com"], ["Binance", "https://binance.com"], ["Bitstamp", "https://www.bitstamp.net"], ["Bitfinex", "https://www.bitfinex.com"]];

const _isStr = str => typeof str === 'string';

const Links = {
  CryptoCompare: () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Link.default, {
    className: CL_LINK,
    href: "https://www.cryptocompare.com",
    title: "Crypto",
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: S_COMPARE,
      children: "Compare"
    })
  })
};
LINK_CONFIGS.forEach(conf => {
  Links[conf[0]] = () => {
    const _confIndex = _isStr(conf[2]) ? 1 : 0;

    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Link.default, {
      className: CL_LINK,
      title: conf[_confIndex],
      href: conf[_confIndex + 1],
      style: conf[_confIndex + 2]
    });
  };
});
var _default = Links;
exports.default = _default;
//# sourceMappingURL=ProviderLinks.js.map