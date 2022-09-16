import toLink from '../zhn/toLink';

const S_LINK = {
  display: 'inline-block',
  paddingTop: 4
};

const Link = ({
  isHttp,
  className='native-link',
  style,
  href,
  caption='Native Link'
}) => {
  const _href = toLink(href, isHttp)
  , _style = {...S_LINK, ...style};
  return _href ? (
    <a
      className={className}
      style={_style}
      href={_href}
    >
      {caption}
    </a>
  ) : (
    <span style={_style}>
      {caption}
    </span>
  );
}

export default Link
