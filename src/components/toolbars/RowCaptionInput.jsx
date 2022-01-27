import A from '../zhn/A';

const S_CAPTION = {
  display: 'inline-block',
  color: 'black',
  width: 48,
  fontWeight: 'bold',
},
S_INPUT_TEXT = {
  width: 56,
  marginRight: 12
};

const RowCaptionInput = ({
  caption,
  forwardRef,
  initValue,
  maxLength=3,
  onAdd
}) => (
  <div>
    <span style={S_CAPTION}>{caption}</span>
    <A.InputText
       ref={forwardRef}
       type="number"
       style={S_INPUT_TEXT}
       initValue={initValue}
       maxLength={maxLength}
       onEnter={onAdd}
    />
    <A.SvgPlus onClick={onAdd} />
  </div>
);

export default RowCaptionInput
