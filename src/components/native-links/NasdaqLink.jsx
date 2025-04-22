import {
  isStr,
  isObj
} from '../../utils/isTypeFn';

import Link from '../zhn/Link';

const NASDAQ_BASE = 'https://www.nasdaq.com/symbol/'
, CAPTION = 'NASDAQ Link';

const NasdaqLink = ({
  item={},
  caption=CAPTION,
  style
}) => {
  const {
    text='',
    value
  } = isObj(item)
      ? item
      : { value: item }
  , _ticket = isStr(value)
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
