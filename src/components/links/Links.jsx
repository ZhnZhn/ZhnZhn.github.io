import withProps from '../hoc/withProps'
import BaseComponent from '../zhn/Link'

const CL_LINK = "descr__quandl-link";

const S = {
  BLUE: {
    //whiteSpace: "nowrap",
    color: "#009ae5"
  },
  BROWN: {
    color: "#bd1010"
  }
};

const Quandl = withProps({
  className: CL_LINK,
  href: "https://www.quandl.com/",
  style: {color: "#E05927"},
  title: "Quandl"
})(BaseComponent)

const Barchart = withProps({
  className: CL_LINK,
  href: "https://www.barchartmarketdata.com",
  style: S.BROWN,
  title: "Barchart Market Data"
})(BaseComponent)

const  AlphaVantage = withProps({
  className: CL_LINK,
  href: "https://www.alphavantage.co",
  style: S.BLUE,
  title: "Alpha Vantage"
})(BaseComponent)

const  Eurostat = withProps({
  className: CL_LINK,
  href: "http://ec.europa.eu/eurostat",
  style: S.BLUE,
  title: "Eurostat"
})(BaseComponent)

const UnComtrade = withProps({
  className: CL_LINK,
  href: "https://comtrade.un.org",
  style: S.BLUE,
  title: "UN Comtrade"
})(BaseComponent)

const FaoStat = withProps({
  className: CL_LINK,
  href: "http://www.fao.org/faostat/en/#data",
  style: S.BLUE,
  title: "FAOSTAT"
})(BaseComponent)

const  Insee = withProps({
  className: CL_LINK,
  href: "https://www.insee.fr/en/accueil",
  style: S.BLUE,
  title: "Insee: France Statistics"
})(BaseComponent)

const StatNorway = withProps({
  className: CL_LINK,
  href: "http://www.ssb.no/en",
  style: S.BLUE,
  title: "Statistics Norway"
})(BaseComponent)

const StatSweden = withProps({
  className: CL_LINK,
  href: "https://www.scb.se/en/",
  style: S.BLUE,
  title: "Statistics Sweden"
})(BaseComponent)


export default {
  Quandl,
  Barchart,
  AlphaVantage,
  Eurostat,
  UnComtrade,
  FaoStat,
  Insee,
  StatNorway,
  StatSweden
};
