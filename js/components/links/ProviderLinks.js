"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.LINK_WTO = exports.LINK_WORLBANK = exports.LINK_UNCOMTRADE = exports.LINK_TW = exports.LINK_STAT_UK = exports.LINK_STAT_SWISS = exports.LINK_STAT_SWEDEN = exports.LINK_STAT_NORWAY = exports.LINK_STAT_IRELAND = exports.LINK_STAT_FRANCE = exports.LINK_STAT_FINLAND = exports.LINK_STAT_DENMARK = exports.LINK_SNB = exports.LINK_OKX = exports.LINK_OECD = exports.LINK_NDL = exports.LINK_MSV = exports.LINK_KUCOIN = exports.LINK_KRAKEN = exports.LINK_IRENA = exports.LINK_INTRINIO = exports.LINK_HTX = exports.LINK_GATEIO = exports.LINK_FMP = exports.LINK_FAOSTAT = exports.LINK_EUROSTAT = exports.LINK_EMBER = exports.LINK_EIA = exports.LINK_EI = exports.LINK_ECB = exports.LINK_DBNOMICS = exports.LINK_CRYPTO_COMPARE = exports.LINK_CRYPTOCOM = exports.LINK_COIN_METRICS = exports.LINK_COIN_LORE = exports.LINK_COIN_GECKO = exports.LINK_COIN_CAP = exports.LINK_COINPAPRIKA = exports.LINK_COINBASE = exports.LINK_BYBIT = exports.LINK_BOC = exports.LINK_BLS = exports.LINK_BITSTAMP = exports.LINK_BITGET = exports.LINK_BITFINEX = exports.LINK_BIS = exports.LINK_BINANCE = exports.LINK_BEA = exports.LINK_AV = void 0;
var _arrFn = require("../../utils/arrFn");
var _Link = _interopRequireDefault(require("../zhn/Link"));
var _jsxRuntime = require("react/jsx-runtime");
const _crUrl = domain => "https://" + domain,
  _crDomainCom = caption => caption.replaceAll(' ', '').toLowerCase() + ".com",
  _crLink = (caption, domain) => () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Link.default, {
    href: _crUrl(domain || _crDomainCom(caption)),
    children: caption
  }),
  _crStatisticsLink = (domain, country, shortName) => _crLink((0, _arrFn.joinByColon)(shortName, "Statistics " + country), domain);
const LINK_OECD = exports.LINK_OECD = _crLink("OECD", "oecd.org"),
  LINK_BIS = exports.LINK_BIS = _crLink("BIS", "bis.org"),
  LINK_ECB = exports.LINK_ECB = _crLink("European Central Bank", "ecb.europa.eu"),
  LINK_BOC = exports.LINK_BOC = _crLink("Bank of Canada", "www.bankofcanada.ca"),
  LINK_SNB = exports.LINK_SNB = _crLink("Swiss National Bank", "www.snb.ch/en/"),
  LINK_NDL = exports.LINK_NDL = _crLink("Nasdaq Data Link", "data.nasdaq.com"),
  LINK_DBNOMICS = exports.LINK_DBNOMICS = _crLink("DBnomics", "db.nomics.world"),
  LINK_EI = exports.LINK_EI = _crLink("Energy Institute", "www.energyinst.org"),
  LINK_EMBER = exports.LINK_EMBER = _crLink("Ember", "ember-energy.org"),
  LINK_IRENA = exports.LINK_IRENA = _crLink("IRENA", "www.irena.org"),
  LINK_FMP = exports.LINK_FMP = _crLink("Financial Modeling Prep"),
  LINK_TW = exports.LINK_TW = _crLink("Twelve Data"),
  LINK_AV = exports.LINK_AV = _crLink("Alpha Vantage", "www.alphavantage.co"),
  LINK_MSV = exports.LINK_MSV = _crLink("Massive"),
  LINK_EUROSTAT = exports.LINK_EUROSTAT = _crLink("Eurostat", "ec.europa.eu/eurostat/"),
  LINK_UNCOMTRADE = exports.LINK_UNCOMTRADE = _crLink("UN Comtrade", "comtrade.un.org"),
  LINK_WORLBANK = exports.LINK_WORLBANK = _crLink("World Bank", "data.worldbank.org"),
  LINK_WTO = exports.LINK_WTO = _crLink("WTO", "wto.org"),
  LINK_FAOSTAT = exports.LINK_FAOSTAT = _crLink("FAOSTAT", "www.fao.org/faostat/en/#data"),
  LINK_BEA = exports.LINK_BEA = _crLink("U.S. Bureau of Economic Analysis", "www.bea.gov"),
  LINK_BLS = exports.LINK_BLS = _crLink("U.S. Bureau of Labor Statistics", "www.bls.gov/home.htm"),
  LINK_EIA = exports.LINK_EIA = _crLink("U.S. EIA", "www.eia.gov"),
  LINK_INTRINIO = exports.LINK_INTRINIO = _crLink("Intrinio"),
  LINK_STAT_FRANCE = exports.LINK_STAT_FRANCE = _crStatisticsLink("www.insee.fr/en/accueil/", "France", "INSEE"),
  LINK_STAT_UK = exports.LINK_STAT_UK = _crStatisticsLink("www.ons.gov.uk", "UK", "ONS"),
  LINK_STAT_NORWAY = exports.LINK_STAT_NORWAY = _crStatisticsLink("www.ssb.no/en/", "Norway"),
  LINK_STAT_SWEDEN = exports.LINK_STAT_SWEDEN = _crStatisticsLink("www.scb.se/en/", "Sweden"),
  LINK_STAT_FINLAND = exports.LINK_STAT_FINLAND = _crStatisticsLink("www.stat.fi/index_en.html", "Finland"),
  LINK_STAT_DENMARK = exports.LINK_STAT_DENMARK = _crStatisticsLink("www.dst.dk/en/", "Denmark"),
  LINK_STAT_IRELAND = exports.LINK_STAT_IRELAND = _crStatisticsLink("www.cso.ie/en/", "Ireland", "CSO"),
  LINK_STAT_SWISS = exports.LINK_STAT_SWISS = _crStatisticsLink("www.bfs.admin.ch/bfs/en/home.html", "Swiss", "FSO"),
  LINK_COIN_CAP = exports.LINK_COIN_CAP = _crLink("CoinCap", "coincap.io"),
  LINK_CRYPTO_COMPARE = exports.LINK_CRYPTO_COMPARE = _crLink("CryptoCompare", "www.cryptocompare.com"),
  LINK_COIN_GECKO = exports.LINK_COIN_GECKO = _crLink("CoinGecko", "www.coingecko.com/en/"),
  LINK_COIN_METRICS = exports.LINK_COIN_METRICS = _crLink("CoinMetrics", "coinmetrics.io"),
  LINK_COIN_LORE = exports.LINK_COIN_LORE = _crLink("CoinLore"),
  LINK_COINPAPRIKA = exports.LINK_COINPAPRIKA = _crLink("Coinpaprika"),
  LINK_BINANCE = exports.LINK_BINANCE = _crLink("Binance"),
  LINK_BITGET = exports.LINK_BITGET = _crLink("Bitget"),
  LINK_BITSTAMP = exports.LINK_BITSTAMP = _crLink("Bitstamp", "www.bitstamp.net"),
  LINK_COINBASE = exports.LINK_COINBASE = _crLink("Coinbase"),
  LINK_BITFINEX = exports.LINK_BITFINEX = _crLink("Bitfinex"),
  LINK_GATEIO = exports.LINK_GATEIO = _crLink("Gate.io", "gate.io"),
  LINK_KRAKEN = exports.LINK_KRAKEN = _crLink("Kraken", "www.kraken.com"),
  LINK_KUCOIN = exports.LINK_KUCOIN = _crLink("KuCoin", "www.kucoin.com"),
  LINK_HTX = exports.LINK_HTX = _crLink("HTX"),
  LINK_OKX = exports.LINK_OKX = _crLink("OKX"),
  LINK_BYBIT = exports.LINK_BYBIT = _crLink("Bybit", "www.bybit.com"),
  LINK_CRYPTOCOM = exports.LINK_CRYPTOCOM = _crLink("Crypto.com", "crypto.com");
//# sourceMappingURL=ProviderLinks.js.map