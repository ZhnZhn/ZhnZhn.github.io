import Link from './Link';

const EURONEXT_BASE = 'https://www.euronext.com/en/products/equities/'
, DF_CAPTION = 'Euronext Link';

const _crLinkId = (isin, market) =>
  isin && market
    ? `${isin}-${market}`
    : void 0;

const EuronextLink = ({
  item,
  caption
}) => {
  const { c='', isin, market } = item || {}
  , _linkId = _crLinkId(isin, market);

  return _linkId ? (
    <Link
      caption={`${caption || DF_CAPTION} ${c}`}
      href={`${EURONEXT_BASE}${_linkId}`}
    />
  ) : null;
}

export default EuronextLink
