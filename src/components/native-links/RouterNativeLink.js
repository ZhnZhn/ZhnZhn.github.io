import DfLink from './DfLink'
import NdlLink from './NdlLink'
import EuronextLink from './EuronextLink'
import NasdaqLink from './NasdaqLink'
import LmeLink from './LmeLink'
import FaoStatLink from './FaoStatLink'
import FredLink from './FredLink'
import CrcLink from './CrcLink'
import EsLink from './EsLink'

const RouterNativeLink = {
  DF: DfLink,
  NDL: NdlLink,
  NASDAQ: NasdaqLink,
  EURONEXT: EuronextLink,
  LME: LmeLink,
  FAO_STAT: FaoStatLink,
  FRED: FredLink,
  CRC: CrcLink,
  ES: EsLink
};

export default RouterNativeLink
