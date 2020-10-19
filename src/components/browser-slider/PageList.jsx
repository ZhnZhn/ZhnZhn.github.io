import { cloneElement } from 'react'

const PageList = ({ pages, pageCurrent }) => pages
 .map((page, index) => cloneElement(page, {
     pageCurrent,
     pageNumber: index + 1
  }));

export default PageList
