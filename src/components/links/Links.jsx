import withProps from '../hoc/withProps'
import BaseComponent from '../zhn/Link'

const CL_LINK = "descr__quandl-link";

const S = {
  BLUE: {
    color: "#009ae5"
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
  style: {color: "#bd1010"},
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

const  Insee = withProps({
  className: CL_LINK,
  href: "https://www.insee.fr/en/accueil",
  style: S.BLUE,
  title: "Insee: France Statistics"
})(BaseComponent)

export default {
  Quandl,
  Barchart,
  AlphaVantage,
  Eurostat,
  UnComtrade,
  Insee
};
