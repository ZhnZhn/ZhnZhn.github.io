import React from 'react'

const Link = ({ title, ...rest }) =>
 <a target="_blank" className="link" {...rest}>
     {title}
  </a>

export default Link
