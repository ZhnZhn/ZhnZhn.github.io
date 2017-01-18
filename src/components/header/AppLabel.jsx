import React from 'react';

const AppLabel = ({ className, caption, title }) => (
  <span
     className={className}
     title={title}
   >
    {caption}
  </span>
)

export default AppLabel
