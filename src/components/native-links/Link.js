import { toHref } from '../uiApi';

const S_LINK = {
  display: 'inline-block',
  paddingTop: 4
};

const Link = ({
  isHttp,
  className='native-link',
  style,
  href,
  caption
}) => {
  const _href = toHref(href, isHttp)
  , _style = {...S_LINK, ...style};
  return _href && caption ? (
    <a
      className={className}
      style={_style}
      href={_href}
    >
      {caption}
    </a>
  ) : null;
};

export default Link
