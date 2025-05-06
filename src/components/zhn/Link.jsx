import { toHref } from '../uiApi';

const Link = (props) => {
  const _href = toHref(props.href);
  return _href && props.children ? <a
      target="_blank"
      href={_href}
      className={props.className}
      style={props.style}
      title={props.title}
      aria-label={props.title}
    >
      {props.children}
    </a> : null;
};

export default Link
