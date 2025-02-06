import InputText from '../zhn/InputText';
import { SvgPlus } from '../zhn/BtSvgCircle';
import { SpanBoldBlack } from '../zhn/SpanToken';

const S_CAPTION = {
  display: 'inline-block',
  width: 48
},
S_INPUT_TEXT = {
  width: 56,
  marginRight: 12
};

const RowCaptionInput = ({
  refEl,
  isBtAdd=true,
  style,
  captionStyle,
  caption,
  initValue,
  maxLength=3,
  onAdd
}) => (
  <div style={style}>
    <SpanBoldBlack
      style={{...S_CAPTION, ...captionStyle}}
    >
      {caption}
    </SpanBoldBlack>
    <InputText
       refEl={refEl}
       type="number"
       style={S_INPUT_TEXT}
       initValue={initValue}
       maxLength={maxLength}
       onEnter={onAdd}
    />
    {isBtAdd ? <SvgPlus onClick={onAdd} /> : null}
  </div>
);

export default RowCaptionInput
