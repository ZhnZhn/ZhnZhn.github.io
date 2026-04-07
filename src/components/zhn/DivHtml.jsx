import {
  domSanitize
} from '../../utils/domFn';
import {
  memo,
  IfTrue
} from '../uiApi';

// biome-ignore-start lint/security/noDangerouslySetInnerHtml: sanitized by domSanitize
const DivHtml = memo(props => {
  const __html = domSanitize(props.str);
  return (
    <IfTrue v={__html}>
      <div
        className={props.className}
        style={props.style}
        dangerouslySetInnerHTML={{__html}}
      />
    </IfTrue>
  );
})
// biome-ignore-end lint/security/noDangerouslySetInnerHtml: sanitized by domSanitize
DivHtml.isHtml = str => Boolean(domSanitize(str))

export default DivHtml
