import { toHref } from '../uiApi';

const Link = ({
  className='link',
  style,
  title,
  href,
  children
}) => (
 <a
   target="_blank"
   className={className}
   style={style}
   href={toHref(href)}
 >
    {title}
    {children}
 </a>
);

export default Link
