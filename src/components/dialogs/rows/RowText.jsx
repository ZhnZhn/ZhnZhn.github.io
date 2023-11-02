import DivEllipsis from '../../zhn/DivEllipsis';
import { S_COLOR_BLACK } from '../../styleFn';

const S_DIV = {
  display: 'flex',
  margin: '5px 5px 5px 10px',
  lineHeight: 2,
  fontWeight: 'bold'
}, S_LABEL = {
  color: '#1b75bb',
  width: 95,
  paddingRight: 5,
  textAlign: 'right',
  fontSize: '16px'
}, S_TEXT = {
  maxWidth: 200,
  height: 32,
  verticalAlign: 'middle',
}
, S_NONE = { display: 'none' };

const RowText = ({
  isShowLabels=true,
  caption,
  text,
  style,
  captionStyle,
  textStyle
}) => text ? (
  <div style={{...S_DIV, ...style}}>
    <div style={{
      ...S_LABEL,
      ...captionStyle,
      ...(isShowLabels ? void 0 : S_NONE)
    }}>
      {caption}
    </div>
    <DivEllipsis
      style={{
        ...S_COLOR_BLACK,
        ...S_TEXT,
        ...textStyle
      }}
      text={text}
    />
  </div>
) : null;

export default RowText
