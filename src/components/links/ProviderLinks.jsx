import React from 'react'

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
 ["Quandl", "Quandl", "https://www.quandl.com", S.ORANGE],
 ["DbNomics", "DB NOMICS", "https://db.nomics.world", S.DARK_GREEN],
 ["Iex", "IEX Cloud", "https://iexcloud.io"],
 ["Fmp", "Financial Modeling Prep", "https://financialmodelingprep.com"],
 ["Barchart", "Barchart Market Data", "https://www.barchartmarketdata.com"],
 ["AlphaVantage", "Alpha Vantage", "https://www.alphavantage.co"],
 ["Eurostat", "Eurostat", "http://ec.europa.eu/eurostat/"],
 ["UnComtrade", "UN Comtrade", "https://comtrade.un.org"],
 ["WorldBank","World Bank", "https://data.worldbank.org"],
 ["FaoStat","FAOSTAT", "http://www.fao.org/faostat/en/#data"],
 ["Bea","U.S. Bureau of Economic Analysis", "https://www.bea.gov/index.htm"],
 ["Bsl","U.S. Bureau of Labor Statistics", "https://www.bls.gov/home.htm"],
 ["Eia","U.S. EIA", "https://www.eia.gov"],
 ["Intrinio",'Intrinio', "https://intrinio.com"],
 ["Insee","Insee: France Statistics", "https://www.insee.fr/en/accueil/"],
 ["ONS","ONS: UK Statistics", "https://www.ons.gov.uk"],
 ["StatNorway","Statistics Norway", "https://www.ssb.no/en/"],
 ["StatSweden","Statistics Sweden", "https://www.scb.se/en/"],
 ["StatFinland","Statistics Finland", "https://www.stat.fi/index_en.html"],
 ["CoinGecko","CoinGecko", "https://www.coingecko.com/en/"],
 ["Coinpaprika", "Coinpaprika", "https://coinpaprika.com/"],
 ["Binance", "Binance", "https://binance.com/"]
];

const Links = {
  CryptoCompare: () => (
    <Link
      className={CL_LINK}
      href="https://www.cryptocompare.com/"
      title="Crypto"
    >
      <span style={S.COMPARE}>Compare</span>
    </Link>
  )
};

LINK_CONFIGS.forEach(conf => {
  Links[conf[0]] = () => (<Link
    className={CL_LINK}
    title={conf[1]}
    href={conf[2]}
    dfStyle={conf[3]}
  />)
})

export default Links
