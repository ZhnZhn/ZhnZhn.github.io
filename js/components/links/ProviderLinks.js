"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _Link = _interopRequireDefault(require("../zhn/Link"));
var _jsxRuntime = require("react/jsx-runtime");
const CL_LINK = "data-provider-link";
const S_COMPARE = {
  color: '#49d87c'
};
const _crUrl = domain => `https://${domain}`;
const LINK_CONFIGS = [["ECB", "European Central Bank", _crUrl("ecb.europa.eu")], ["BOC", "Bank of Canada", _crUrl("www.bankofcanada.ca")], ["SNB", "Swiss National Bank", _crUrl("www.snb.ch/en/")], ["Ndl", "Nasdaq Data Link", _crUrl("data.nasdaq.com")], ["DBnomics", _crUrl("db.nomics.world")], ["EI", "Energy Institute", _crUrl("www.energyinst.org")], ["Ember", _crUrl("ember-climate.org")], ["IRENA", _crUrl("www.irena.org")], ["Iex", "IEX Cloud", _crUrl("iexcloud.io")], ["Fmp", "Financial Modeling Prep", _crUrl("financialmodelingprep.com")], ["Tw", "Twelve Data", _crUrl("twelvedata.com")], ["AlphaVantage", "Alpha Vantage", _crUrl("www.alphavantage.co")], ["Eurostat", _crUrl("ec.europa.eu/eurostat/")], ["UnComtrade", "UN Comtrade", _crUrl("comtrade.un.org")], ["WorldBank", "World Bank", _crUrl("data.worldbank.org")], ["WTO", _crUrl("wto.org")], ["FaoStat", "FAOSTAT", _crUrl("www.fao.org/faostat/en/#data")], ["Bea", "U.S. Bureau of Economic Analysis", _crUrl("www.bea.gov")], ["Bsl", "U.S. Bureau of Labor Statistics", _crUrl("www.bls.gov/home.htm")], ["Eia", "U.S. EIA", _crUrl("www.eia.gov")], ["Intrinio", _crUrl("intrinio.com")], ["Insee", "INSEE: Statistics France", _crUrl("www.insee.fr/en/accueil/")], ["ONS", "ONS: Statistics UK", _crUrl("www.ons.gov.uk")], ["StatNorway", "Statistics Norway", _crUrl("www.ssb.no/en/")], ["StatSweden", "Statistics Sweden", _crUrl("www.scb.se/en/")], ["StatFinland", "Statistics Finland", _crUrl("www.stat.fi/index_en.html")], ["StatDenmark", "Statistics Denmark", _crUrl("www.dst.dk/en/")], ["StatIreland", "CSO: Statistics Ireland", _crUrl("www.cso.ie/en/")], ["FSO", "FSO: Statistics Swiss", _crUrl("www.bfs.admin.ch/bfs/en/home.html")], ["CoinGecko", _crUrl("www.coingecko.com/en/")], ["CoinMetrics", _crUrl("coinmetrics.io")], ["CoinLore", _crUrl("www.coinlore.com")], ["Coinpaprika", _crUrl("coinpaprika.com")], ["Binance", _crUrl("binance.com")], ["Bitstamp", _crUrl("www.bitstamp.net")], ["Coinbase", _crUrl("coinbase.com")], ["Bitfinex", _crUrl("bitfinex.com")], ["GateIo", "Gate.io", _crUrl("gate.io")], ["Kraken", _crUrl("www.kraken.com")], ["KuCoin", _crUrl("www.kucoin.com")], ["HTX", _crUrl("htx.com")], ["OKX", _crUrl("okx.com")], ["Bybit", _crUrl("www.bybit.com")], ["CryptoCom", "Crypto.com", _crUrl("crypto.com")]];
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
var _default = exports.default = Links;
//# sourceMappingURL=ProviderLinks.js.map