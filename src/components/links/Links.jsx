import withProps from '../hoc/withProps'
import BaseComponent from '../zhn/Link'

const CL_LINK = "descr__quandl-link";

const S = {
  BLUE: {
    //whiteSpace: "nowrap",
    color: "#009ae5"
  },
  ORANGE: {
    color: "#e05927"
  },
  SUNNY: {
    color: "#ffa200",
  },
  WHITE: {
    color: 'white'
  }
};

const Quandl = withProps({
  className: CL_LINK,
  href: "https://www.quandl.com/",
  dfStyle: S.ORANGE,
  title: "Quandl"
})(BaseComponent)

const Iex = withProps({
  className: CL_LINK,
  href: "https://iextrading.com/developer/",
  dfStyle: S.SUNNY,
  title: "IEX Platform"
})(BaseComponent)

const Barchart = withProps({
  className: CL_LINK,
  href: "https://www.barchartmarketdata.com",
  dfStyle: S.BLUE,
  title: "Barchart Market Data"
})(BaseComponent)

const  AlphaVantage = withProps({
  className: CL_LINK,
  href: "https://www.alphavantage.co",
  dfStyle: S.BLUE,
  title: "Alpha Vantage"
})(BaseComponent)

const  Eurostat = withProps({
  className: CL_LINK,
  href: "http://ec.europa.eu/eurostat",
  dfStyle: S.BLUE,
  title: "Eurostat"
})(BaseComponent)

const UnComtrade = withProps({
  className: CL_LINK,
  href: "https://comtrade.un.org",
  dfStyle: S.BLUE,
  title: "UN Comtrade"
})(BaseComponent)

const FaoStat = withProps({
  className: CL_LINK,
  href: "http://www.fao.org/faostat/en/#data",
  dfStyle: S.BLUE,
  title: "FAOSTAT"
})(BaseComponent)

const Bea = withProps({
  className: CL_LINK,
  href: "https://www.bea.gov/index.htm",
  dfStyle: S.WHITE,
  title: "U.S. Bureau of Economic Analysis"
})(BaseComponent)

const  Insee = withProps({
  className: CL_LINK,
  href: "https://www.insee.fr/en/accueil",
  dfStyle: S.BLUE,
  title: "Insee: France Statistics"
})(BaseComponent)

const StatNorway = withProps({
  className: CL_LINK,
  href: "http://www.ssb.no/en",
  dfStyle: S.BLUE,
  title: "Statistics Norway"
})(BaseComponent)

const StatSweden = withProps({
  className: CL_LINK,
  href: "https://www.scb.se/en/",
  dfStyle: S.BLUE,
  title: "Statistics Sweden"
})(BaseComponent)


export default {
  Quandl,
  Iex,
  Barchart,
  AlphaVantage,
  Eurostat,
  UnComtrade,
  FaoStat,
  Bea,
  Insee,
  StatNorway,
  StatSweden
};
