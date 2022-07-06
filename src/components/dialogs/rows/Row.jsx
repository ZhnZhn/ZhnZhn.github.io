import DivEllipsis from '../../zhn/DivEllipsis';

const S_ROOT_DIV = {
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
},
S_NONE = { display: 'none' };

const Text = ({
  isShowLabels=true,
  caption,
  text,
  styleRoot,
  styleCaption,
  styleText
}) => {
  if (!text) return null;
  const _styleCaption = isShowLabels
    ? void 0 : S_NONE;
  return (
    <div style={{...S_ROOT_DIV, ...styleRoot}}>
      <div style={{...S_LABEL, ...styleCaption, ..._styleCaption}}>
        {caption}
      </div>
      <DivEllipsis
        style={{...S_TEXT, ...styleText}}
        text={text}
      />
    </div>
  );
};

export default { Text }
