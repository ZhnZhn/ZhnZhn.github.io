import Link from '../zhn/Link'

const CL_LINK = "data-provider-link";

const S = {
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

const LINK_CONFIGS = [
 ["Quandl", "https://www.quandl.com", S.ORANGE],
 ["DbNomics", "DB NOMICS", "https://db.nomics.world", S.DARK_GREEN],
 ["Iex", "IEX Cloud", "https://iexcloud.io"],
 ["Fmp", "Financial Modeling Prep", "https://financialmodelingprep.com"],
 ["Tw", "Twelve Data", "https://twelvedata.com"],
 ["AlphaVantage", "Alpha Vantage", "https://www.alphavantage.co"],
 ["Eurostat", "https://ec.europa.eu/eurostat/"],
 ["UnComtrade", "UN Comtrade", "https://comtrade.un.org"],
 ["WorldBank","World Bank", "https://data.worldbank.org"],
 ["FaoStat","FAOSTAT", "http://www.fao.org/faostat/en/#data"],
 ["Bea","U.S. Bureau of Economic Analysis", "https://www.bea.gov/index.htm"],
 ["Bsl","U.S. Bureau of Labor Statistics", "https://www.bls.gov/home.htm"],
 ["Eia","U.S. EIA", "https://www.eia.gov"],
 ["Intrinio", "https://intrinio.com"],
 ["Insee","Insee: France Statistics", "https://www.insee.fr/en/accueil/"],
 ["ONS","ONS: UK Statistics", "https://www.ons.gov.uk"],
 ["StatNorway","Statistics Norway", "https://www.ssb.no/en/"],
 ["StatSweden","Statistics Sweden", "https://www.scb.se/en/"],
 ["StatFinland","Statistics Finland", "https://www.stat.fi/index_en.html"],
 ["StatDenmark","Statistics Denmark", "https://www.dst.dk/en/"],
 ["CoinGecko", "https://www.coingecko.com/en/"],
 ["CoinMetrics","https://coinmetrics.io"],
 ["CoinLore","https://www.coinlore.com"],
 ["Coinpaprika", "https://coinpaprika.com"],
 ["Binance", "https://binance.com"],
 ["Bitstamp", "https://www.bitstamp.net"],
 ["Bitfinex", "https://www.bitfinex.com"]
];

const _isStr = str => typeof str === 'string';

const Links = {
  CryptoCompare: () => (
    <Link
      className={CL_LINK}
      href="https://www.cryptocompare.com"
      title="Crypto"
    >
      <span style={S.COMPARE}>Compare</span>
    </Link>
  )
};

LINK_CONFIGS.forEach(conf => {
  Links[conf[0]] = () => {
    const _confIndex = _isStr(conf[2]) ? 1 : 0;
    return (<Link
      className={CL_LINK}
      title={conf[_confIndex]}
      href={conf[_confIndex+1]}
      style={conf[_confIndex+2]}
   />);
  }
})

export default Links
