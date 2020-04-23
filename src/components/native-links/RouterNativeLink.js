
import DfLink from './DfLink'
import QuandlLink from './QuandlLink'
import EuronextLink from './EuronextLink'
import NasdaqLink from './NasdaqLink'
import BarchartLink from './BarchartLink'
import LmeLink from './LmeLink'
import UnComtradeLink from './UnComtradeLink'
import FaoStatLink from './FaoStatLink'
import FredLink from './FredLink'
import CrcLink from './CrcLink'
import EsLink from './EsLink'

const RouterNativeLink = {
  DF: DfLink,
  QUANDL: QuandlLink,
  EURONEXT: EuronextLink,
  NASDAQ: NasdaqLink,
  BR: BarchartLink,
  LME: LmeLink,
  UN_COMTRADE: UnComtradeLink,
  FAO_STAT: FaoStatLink,
  FRED: FredLink,
  CRC: CrcLink,
  ES: EsLink
};

export default RouterNativeLink
