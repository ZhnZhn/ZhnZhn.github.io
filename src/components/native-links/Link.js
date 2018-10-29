import React from 'react'

import STYLE from './Link.Style'

const Link = ({
  className='native-link',
  style,
  href,
  caption='Native Link'
}) => {
  if (!href) {
    return null;
  }

  return (
    <a
      className={className}
      style={{ ...STYLE.LINK, ...style }}
      href={href}
    >
      {caption}
    </a>
  )
}

export default Link
