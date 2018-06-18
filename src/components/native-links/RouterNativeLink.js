
import QuandlLink from './QuandlLink'
import EuronextLink from './EuronextLink'
import NasdaqLink from './NasdaqLink'
import LmeLink from './LmeLink'
import UnComtradeLink from './UnComtradeLink'
import FaoStatLink from './FaoStatLink'
import FredLink from './FredLink'
import BslLink from './BslLink'
import CrcLink from './CrcLink'
import EsLink from './EsLink'

const RouterNativeLink = {
  QUANDL: QuandlLink,
  EURONEXT: EuronextLink,
  NASDAQ: NasdaqLink,
  LME: LmeLink,
  UN_COMTRADE: UnComtradeLink,
  FAO_STAT: FaoStatLink,
  FRED: FredLink,
  BSL: BslLink,
  CRC: CrcLink,
  ES: EsLink
};

export default RouterNativeLink
