import { memo } from 'react';
import DOMPurify from 'dompurify';

const DivHtml = memo(({
  str,
  className,
  style
}) => {
  const __html = DOMPurify.sanitize(str);
  return __html ? (
    <div
      className={className}
      style={style}
      dangerouslySetInnerHTML={{ __html }}
    />
  ) : null;
})
DivHtml.isHtml = str => Boolean(DOMPurify.sanitize(str))

export default DivHtml
