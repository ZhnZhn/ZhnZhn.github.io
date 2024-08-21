import DfLink from './DfLink'
import NdlLink from './NdlLink'
import EuronextLink from './EuronextLink'
import NasdaqLink from './NasdaqLink'
import LmeLink from './LmeLink'
import FredLink from './FredLink'
import CrcLink from './CrcLink'
import EsLink from './EsLink'

const RouterNativeLink = {
  DF: DfLink,
  NDL: NdlLink,
  NASDAQ: NasdaqLink,
  EURONEXT: EuronextLink,
  LME: LmeLink,  
  FRED: FredLink,
  CRC: CrcLink,
  ES: EsLink
};

export default RouterNativeLink
