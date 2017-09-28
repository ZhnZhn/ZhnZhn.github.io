
import QuandlLink from './QuandlLink'
import EuronextLink from './EuronextLink'
import NasdaqLink from './NasdaqLink'
import LmeLink from './LmeLink'
import UnComtradeLink from './UnComtradeLink'
import FaoStatLink from './FaoStatLink'

const RouterNativeLink = {
  QUANDL: QuandlLink,
  EURONEXT: EuronextLink,
  NASDAQ: NasdaqLink,
  LME: LmeLink,
  UN_COMTRADE: UnComtradeLink,
  FAO_STAT: FaoStatLink
}

export default RouterNativeLink
