"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _Link = _interopRequireDefault(require("../zhn/Link"));
var _jsxRuntime = require("react/jsx-runtime");
const _crUrl = domain => `https://${domain}`;
const LINK_CONFIGS = [["OECD", _crUrl("oecd.org")], ["BIS", _crUrl("bis.org")], ["ECB", "European Central Bank", _crUrl("ecb.europa.eu")], ["BOC", "Bank of Canada", _crUrl("www.bankofcanada.ca")], ["SNB", "Swiss National Bank", _crUrl("www.snb.ch/en/")], ["Ndl", "Nasdaq Data Link", _crUrl("data.nasdaq.com")], ["DBnomics", _crUrl("db.nomics.world")], ["EI", "Energy Institute", _crUrl("www.energyinst.org")], ["Ember", _crUrl("ember-energy.org")], ["IRENA", _crUrl("www.irena.org")], ["Fmp", "Financial Modeling Prep", _crUrl("financialmodelingprep.com")], ["Tw", "Twelve Data", _crUrl("twelvedata.com")], ["AlphaVantage", "Alpha Vantage", _crUrl("www.alphavantage.co")], ["Plg", "Polygon.io", _crUrl("polygon.io")], ["Eurostat", _crUrl("ec.europa.eu/eurostat/")], ["UnComtrade", "UN Comtrade", _crUrl("comtrade.un.org")], ["WorldBank", "World Bank", _crUrl("data.worldbank.org")], ["WTO", _crUrl("wto.org")], ["FaoStat", "FAOSTAT", _crUrl("www.fao.org/faostat/en/#data")], ["Bea", "U.S. Bureau of Economic Analysis", _crUrl("www.bea.gov")], ["Bsl", "U.S. Bureau of Labor Statistics", _crUrl("www.bls.gov/home.htm")], ["Eia", "U.S. EIA", _crUrl("www.eia.gov")], ["Intrinio", _crUrl("intrinio.com")], ["Insee", "INSEE: Statistics France", _crUrl("www.insee.fr/en/accueil/")], ["ONS", "ONS: Statistics UK", _crUrl("www.ons.gov.uk")], ["StatNorway", "Statistics Norway", _crUrl("www.ssb.no/en/")], ["StatSweden", "Statistics Sweden", _crUrl("www.scb.se/en/")], ["StatFinland", "Statistics Finland", _crUrl("www.stat.fi/index_en.html")], ["StatDenmark", "Statistics Denmark", _crUrl("www.dst.dk/en/")], ["StatIreland", "CSO: Statistics Ireland", _crUrl("www.cso.ie/en/")], ["FSO", "FSO: Statistics Swiss", _crUrl("www.bfs.admin.ch/bfs/en/home.html")], ["CoinCap", _crUrl("coincap.io")], ["CryptoCompare", _crUrl("www.cryptocompare.com")], ["CoinGecko", _crUrl("www.coingecko.com/en/")], ["CoinMetrics", _crUrl("coinmetrics.io")], ["CoinLore", _crUrl("www.coinlore.com")], ["Coinpaprika", _crUrl("coinpaprika.com")], ["Binance", _crUrl("binance.com")], ["Bitget", _crUrl("bitget.com")], ["Bitstamp", _crUrl("www.bitstamp.net")], ["Coinbase", _crUrl("coinbase.com")], ["Bitfinex", _crUrl("bitfinex.com")], ["GateIo", "Gate.io", _crUrl("gate.io")], ["Kraken", _crUrl("www.kraken.com")], ["KuCoin", _crUrl("www.kucoin.com")], ["HTX", _crUrl("htx.com")], ["OKX", _crUrl("okx.com")], ["Bybit", _crUrl("www.bybit.com")], ["CryptoCom", "Crypto.com", _crUrl("crypto.com")]];
const Links = LINK_CONFIGS.reduce((result, conf) => {
  result[conf[0]] = () => {
    const _confIndex = (0, _isTypeFn.isStr)(conf[2]) ? 1 : 0;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Link.default, {
      href: conf[_confIndex + 1],
      children: conf[_confIndex]
    });
  };
  return result;
}, {});
var _default = exports.default = Links;
//# sourceMappingURL=ProviderLinks.js.map