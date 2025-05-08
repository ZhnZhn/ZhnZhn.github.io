import { crInputNumberProps } from '../inputFn';

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
  min=1,
  max=999,
  onAdd
}) => (
  <div style={style}>
    <SpanBoldBlack
      style={{...S_CAPTION, ...captionStyle}}
    >
      {caption}
    </SpanBoldBlack>
    <InputText
       {...crInputNumberProps(initValue, min, max)}
       refEl={refEl}
       style={S_INPUT_TEXT}       
       onEnter={onAdd}
    />
    {isBtAdd ? <SvgPlus onClick={onAdd} /> : null}
  </div>
);

export default RowCaptionInput
