import A from '../zhn/A';
import SpanBlack from '../zhn/SpanBlack';

const S_CAPTION = {
  display: 'inline-block',
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
    <SpanBlack style={S_CAPTION}>{caption}</SpanBlack>
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
