import { domSanitize } from '../../utils/domSanitize';
import { memo } from '../uiApi';
import { IfTrue } from './IfTrue';

const DivHtml = memo(({
  str,
  className,
  style
}) => {
  const __html = domSanitize(str);
  return (
    <IfTrue v={__html}>
      <div
        className={className}
        style={style}
        dangerouslySetInnerHTML={{__html}}
      />
    </IfTrue>
  );
})
DivHtml.isHtml = str => Boolean(domSanitize(str))

export default DivHtml
