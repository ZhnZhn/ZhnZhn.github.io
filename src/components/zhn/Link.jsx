import React from 'react'

const Link = ({ title, dfStyle, style, ...rest }) =>
 <a
   target="_blank"
   className="link"
   style={{...dfStyle, ...style}}
   {...rest}
 >
    {title}
 </a>

export default Link
