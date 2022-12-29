import Link from './Link';

const URL = 'https://www.cryptocompare.com/coins';

const _isStrNotEmpty = str => typeof str === 'string'
 && str;
const _crHref = item => _isStrNotEmpty(item)
  ? `${URL}/${item.toLowerCase()}/overview`
  : URL;

const CrcLink = ({
  item,
  style
}) => (
  <Link
    style={style}
    caption={`CryptoCompare Overview (${item})`}
    href={_crHref(item)}
  />
);

export default CrcLink
