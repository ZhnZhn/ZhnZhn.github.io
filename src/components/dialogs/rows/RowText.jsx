import DivEllipsis from '../../zhn/DivEllipsis';

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
}) => {
  if (!text) return null;
  const _captionStyle = isShowLabels
    ? void 0 : S_NONE;
  return (
    <div style={{...S_DIV, ...style}}>
      <div style={{...S_LABEL, ...captionStyle, ..._captionStyle}}>
        {caption}
      </div>
      <DivEllipsis
        style={{...S_TEXT, ...textStyle}}
        text={text}
      />
    </div>
  );
};

export default RowText
