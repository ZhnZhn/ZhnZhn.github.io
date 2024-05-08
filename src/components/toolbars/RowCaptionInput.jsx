import InputText from '../zhn/InputText';
import { SvgPlus } from '../zhn/BtSvgCircle';
import { SpanBlack } from '../zhn/SpanToken';

import { S_INLINE_BLOCK_BOLD } from './Row.Style';

const S_CAPTION = {
  ...S_INLINE_BLOCK_BOLD,
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
    <SpanBlack
      style={{...S_CAPTION, ...captionStyle}}
    >
      {caption}
    </SpanBlack>
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
