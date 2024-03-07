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
  caption,
  forwardRef,
  initValue,
  maxLength=3,
  onAdd
}) => (
  <div>
    <SpanBlack style={S_CAPTION}>{caption}</SpanBlack>
    <InputText
       ref={forwardRef}
       type="number"
       style={S_INPUT_TEXT}
       initValue={initValue}
       maxLength={maxLength}
       onEnter={onAdd}
    />
    <SvgPlus onClick={onAdd} />
  </div>
);

export default RowCaptionInput
