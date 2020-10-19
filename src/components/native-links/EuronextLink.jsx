import Link from './Link'

const EURONEXT_BASE = 'https://www.euronext.com/en/products/equities/'
    , CAPTION = 'Euronext Link';

const EuronextLink = ({ item={}, caption=CAPTION }) => (
  <Link
    caption={`${caption} ${item.caption}`}
    href={`${EURONEXT_BASE}${item.isin}-${item.market}`}
  />
);

export default EuronextLink
