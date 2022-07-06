import {
  S_ELLIPSIS
} from '../../styles/GeneralStyles';

const S_ROOT_DIV = {
  margin: '5px 5px 5px 10px',
  lineHeight: 2,
  fontWeight: 'bold'
}, S_LABEL_SPAN = {
  display: 'inline-block',
  color: '#1b75bb',
  width: 95,
  paddingRight: 5,
  textAlign: 'right',
  fontSize: '16px'
}, S_TEXT = {
  display: 'inline-block',
  maxWidth: 200,
  height: 32,
  verticalAlign: 'middle',
  ...S_ELLIPSIS
},
S_NONE = { display: 'none' };

const Text = ({
  isShowLabels=true,
  caption, text,
  styleRoot, styleCaption, styleText
}) => {
  if (!text) return null;
  const _styleCaption = isShowLabels
    ? void 0 : S_NONE;
  return (
    <div style={{...S_ROOT_DIV, ...styleRoot}}>
      <span style={{...S_LABEL_SPAN, ...styleCaption, ..._styleCaption}}>
        {caption}
      </span>
      <span style={{...S_TEXT, ...styleText}}>
        {text}
      </span>
    </div>
  );
};

export default { Text }
