import React, { memo } from 'react'
import DOMPurify from 'dompurify'

const DivHtml = memo(({ str, className, style }) => {
  const __html = DOMPurify.sanitize(str);
  if (!__html){
    return null;
  }
  return (
    <div
      className={className}
      style={style}
      dangerouslySetInnerHTML={{ __html }}
    />
  );
})
DivHtml.isHtml = str => Boolean(DOMPurify.sanitize(str))

export default DivHtml
