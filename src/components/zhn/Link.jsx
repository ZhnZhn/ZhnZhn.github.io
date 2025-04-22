import { toHref } from '../uiApi';

const Link = ({
  className,
  style,
  caption,
  href,
  children
}) => {
  const _href = toHref(href);
  return _href && (caption || children) ? (
    <a
      target="_blank"
      className={className}
      style={style}
      href={_href}
    >
      {caption}
      {children}
    </a>
  ) : null;
}

export default Link
