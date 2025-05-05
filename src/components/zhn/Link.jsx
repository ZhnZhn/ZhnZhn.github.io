import { toHref } from '../uiApi';
import { IfTrue } from './IfTrue';

const Link = ({
  className,
  style,
  caption,
  href,
  children
}) => {
  const _href = toHref(href);
  return (
    <IfTrue v={_href && (caption || children)}>
      <a
        target="_blank"
        className={className}
        style={style}
        href={_href}
      >
        {caption}
        {children}
      </a>
    </IfTrue>
  );
}

export default Link
