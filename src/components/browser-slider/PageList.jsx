import React from 'react'

const PageList = ({ pages, pageCurrent }) => pages
 .map((page, index) => React.cloneElement(page, {
     pageCurrent,
     pageNumber: index + 1,
  }));

export default PageList  
