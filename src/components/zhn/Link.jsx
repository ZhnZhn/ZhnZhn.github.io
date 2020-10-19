const Link = ({ title, dfStyle, style, children, ...rest }) => (
 <a
   target="_blank"
   className="link"
   style={{...dfStyle, ...style}}
   {...rest}
 >
    {title}
    {children}
 </a>
);

export default Link
