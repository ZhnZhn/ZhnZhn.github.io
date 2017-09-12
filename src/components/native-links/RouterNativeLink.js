
import QuandlLink from './QuandlLink'
import EuronextLink from './EuronextLink'
import NasdaqLink from './NasdaqLink'
import LmeLink from './LmeLink'
import UnComtradeLink from './UnComtradeLink'

const RouterNativeLink = {
  QUANDL: QuandlLink,
  EURONEXT: EuronextLink,
  NASDAQ: NasdaqLink,
  LME: LmeLink,
  UN_COMTRADE: UnComtradeLink
}

export default RouterNativeLink
