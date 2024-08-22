import DfLink from './DfLink'
import NdlLink from './NdlLink'
import NasdaqLink from './NasdaqLink'
import FredLink from './FredLink'
import EsLink from './EsLink'

const RouterNativeLink = {
  DF: DfLink,
  NDL: NdlLink,
  NASDAQ: NasdaqLink,
  FRED: FredLink,
  ES: EsLink
};

export default RouterNativeLink
