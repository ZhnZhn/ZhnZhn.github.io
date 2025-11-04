import { joinByColon } from '../../utils/arrFn';
import Link from '../zhn/Link';

const _crUrl = domain => `https://${domain}`
, _crDomainCom = caption => caption
  .replaceAll(' ', '')
  .toLowerCase() + ".com"
, _crLink = (
  caption,
  domain
) => () => (
  <Link href={_crUrl(domain || _crDomainCom(caption))}>
    {caption}
  </Link>
)
, _crStatisticsLink = (
  domain,
  country,
  shortName
) => _crLink(
  joinByColon(shortName, `Statistics ${country}`),
  domain
);

export const LINK_OECD = _crLink("OECD", "oecd.org")
, LINK_BIS = _crLink("BIS", "bis.org")
, LINK_ECB = _crLink("European Central Bank", "ecb.europa.eu")
, LINK_BOC = _crLink("Bank of Canada", "www.bankofcanada.ca")
, LINK_SNB = _crLink("Swiss National Bank", "www.snb.ch/en/")
, LINK_NDL = _crLink("Nasdaq Data Link", "data.nasdaq.com")
, LINK_DBNOMICS = _crLink("DBnomics", "db.nomics.world")
, LINK_EI = _crLink("Energy Institute", "www.energyinst.org")
, LINK_EMBER = _crLink("Ember", "ember-energy.org")
, LINK_IRENA = _crLink("IRENA", "www.irena.org")
, LINK_FMP = _crLink("Financial Modeling Prep")
, LINK_TW = _crLink("Twelve Data")
, LINK_AV = _crLink("Alpha Vantage", "www.alphavantage.co")
, LINK_MSV = _crLink("Massive")
, LINK_EUROSTAT = _crLink("Eurostat", "ec.europa.eu/eurostat/")
, LINK_UNCOMTRADE = _crLink("UN Comtrade", "comtrade.un.org")
, LINK_WORLBANK = _crLink("World Bank", "data.worldbank.org")
, LINK_WTO = _crLink("WTO", "wto.org")
, LINK_FAOSTAT = _crLink("FAOSTAT", "www.fao.org/faostat/en/#data")
, LINK_BEA = _crLink("U.S. Bureau of Economic Analysis", "www.bea.gov")
, LINK_BLS = _crLink("U.S. Bureau of Labor Statistics", "www.bls.gov/home.htm")
, LINK_EIA = _crLink("U.S. EIA", "www.eia.gov")
, LINK_INTRINIO = _crLink("Intrinio")
, LINK_STAT_FRANCE = _crStatisticsLink("www.insee.fr/en/accueil/", "France", "INSEE")
, LINK_STAT_UK = _crStatisticsLink("www.ons.gov.uk", "UK", "ONS")
, LINK_STAT_NORWAY = _crStatisticsLink("www.ssb.no/en/", "Norway")
, LINK_STAT_SWEDEN = _crStatisticsLink("www.scb.se/en/", "Sweden")
, LINK_STAT_FINLAND = _crStatisticsLink("www.stat.fi/index_en.html", "Finland")
, LINK_STAT_DENMARK = _crStatisticsLink("www.dst.dk/en/", "Denmark")
, LINK_STAT_IRELAND = _crStatisticsLink("www.cso.ie/en/", "Ireland", "CSO")
, LINK_STAT_SWISS = _crStatisticsLink("www.bfs.admin.ch/bfs/en/home.html", "Swiss", "FSO")
, LINK_COIN_CAP = _crLink("CoinCap", "coincap.io")
, LINK_CRYPTO_COMPARE = _crLink("CryptoCompare", "www.cryptocompare.com")
, LINK_COIN_GECKO = _crLink("CoinGecko", "www.coingecko.com/en/")
, LINK_COIN_METRICS = _crLink("CoinMetrics", "coinmetrics.io")
, LINK_COIN_LORE = _crLink("CoinLore")
, LINK_COINPAPRIKA = _crLink("Coinpaprika")
, LINK_BINANCE = _crLink("Binance")
, LINK_BITGET = _crLink("Bitget")
, LINK_BITSTAMP = _crLink("Bitstamp", "www.bitstamp.net")
, LINK_COINBASE = _crLink("Coinbase")
, LINK_BITFINEX = _crLink("Bitfinex")
, LINK_GATEIO = _crLink("Gate.io", "gate.io")
, LINK_KRAKEN = _crLink("Kraken", "www.kraken.com")
, LINK_KUCOIN = _crLink("KuCoin", "www.kucoin.com")
, LINK_HTX = _crLink("HTX")
, LINK_OKX = _crLink("OKX")
, LINK_BYBIT = _crLink("Bybit", "www.bybit.com")
, LINK_CRYPTOCOM = _crLink("Crypto.com", "crypto.com")
