import { memo } from 'react';
import domSanitize from '../../utils/domSanitize';

const DivHtml = memo(({
  str,
  className,
  style
}) => {
  const __html = domSanitize(str);
  return __html ? (
    <div
      className={className}
      style={style}
      dangerouslySetInnerHTML={{ __html }}
    />
  ) : null;
})
DivHtml.isHtml = str => Boolean(domSanitize(str))

export default DivHtml
