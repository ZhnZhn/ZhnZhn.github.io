import React from 'react'

const S = {
  LINK: {
    display: 'inline-block',
    paddingTop: 4
  }
};

const Link = ({
  className='native-link',
  style,
  href,
  caption='Native Link'
}) => href ? (
  <a
    className={className}
    style={{...S.LINK, ...style}}
    href={href}
  >
    {caption}
  </a>
) : null;

export default Link
