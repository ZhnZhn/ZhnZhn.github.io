import React from 'react';

const ScrollPane = ({ style, className="", children }) => (
   <div className={`with-scroll ${className}`} style={style}>
      {children}
   </div>
)

export default ScrollPane
