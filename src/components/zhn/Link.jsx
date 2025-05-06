import { toHref } from '../uiApi';

const Link = (props) => {
  const _href = toHref(props.href);
  return _href && props.children ? <a
      target="_blank"
      className={props.className}
      style={props.style}
      href={_href}
    >
      {props.children}
    </a> : null;
};

export default Link
