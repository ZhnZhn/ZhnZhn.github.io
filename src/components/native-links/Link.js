import React from 'react'

import STYLE from './Link.Style'

const Link = ({ className, style, href, caption }) =>
  <a
    className={className}
    style={{ ...STYLE.LINK, ...style }}
    href={href}
  >
    {caption}
  </a>

export default Link
