import { domSanitize } from '../../utils/domSanitize';
import {
  memo,
  IfTrue
} from '../uiApi';

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
DivHtml.isHtml = str => Boolean(domSanitize(str))

export default DivHtml
