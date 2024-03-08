import DivEllipsis from '../../zhn/DivEllipsis';
import { SpanInputLabel } from '../../zhn/SpanToken';
import {
  S_NONE,
  CL_BLACK
} from '../../styleFn';

const S_DIV = {
  display: 'flex',
  margin: '5px 5px 5px 10px',
  lineHeight: 2
}, S_TEXT = {
  maxWidth: 200,
  height: 32,
  verticalAlign: 'middle',
  fontWeight: 'bold'
};

const RowText = ({
  isShowLabels=true,
  caption,
  text,
  style,
  captionStyle,
  textStyle
}) => text ? (
  <div style={{...S_DIV, ...style}}>
    <SpanInputLabel style={{
      ...captionStyle,
      ...(isShowLabels ? void 0 : S_NONE)
    }}>
      {caption}
    </SpanInputLabel>
    <DivEllipsis
      className={CL_BLACK}
      style={{
        ...S_TEXT,
        ...textStyle
      }}
      text={text}
    />
  </div>
) : null;

export default RowText
