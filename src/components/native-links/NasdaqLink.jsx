import Link from './Link';

const NASDAQ_BASE = 'https://www.nasdaq.com/symbol/'
, CAPTION = 'NASDAQ Link';

const _isObj = v => v && typeof v === 'object';
const _isStr = v => typeof v === 'string';

const NasdaqLink = ({
  item={},
  caption=CAPTION,
  style
}) => {
  const {
    text='',
    value
  } = _isObj(item)
      ? item
      : { value: item }
  , _ticket = _isStr(value)
      ? value.trim()
      : text.split('-')[0].trim();
  return (
    <Link
      style={style}
      href={`${NASDAQ_BASE}${_ticket}`}
      caption={`${caption} ${_ticket}`}
    />
  );
}

export default NasdaqLink
