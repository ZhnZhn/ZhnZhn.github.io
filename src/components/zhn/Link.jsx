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
   href={href}
 >
    {title}
    {children}
 </a>
);

export default Link
