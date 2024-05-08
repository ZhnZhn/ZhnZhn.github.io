import { useState } from '../uiApi';

import InputText from '../zhn/InputText';
import { SvgPlus } from '../zhn/BtSvgCircle';
import { SpanBlack } from '../zhn/SpanToken';

import { S_INLINE_BLOCK_BOLD } from './Row.Style';

const S_CAPTION = {
  ...S_INLINE_BLOCK_BOLD,
  width: 120
}
, S_INPUT_TEXT = {
  width: 46,
  marginRight: 12
};

const RowTypeB = ({
  refEl,
  caption,
  initValue,
  min,
  max,
  maxLength,
  onAdd
}) => {
  const [
    isPlus,
    setIsPlus
  ] = useState(true)
  , _onAdd = isPlus ? () => {
     setIsPlus(!onAdd())
  } : void 0;
  return (
    <div>
      <SpanBlack style={S_CAPTION}>
        {caption}
      </SpanBlack>
      <InputText
         refEl={refEl}
         type="number"
         style={S_INPUT_TEXT}
         initValue={initValue}
         maxLength={maxLength}
         min={min}
         max={max}
         onEnter={_onAdd}
      />
      {isPlus && <SvgPlus onClick={_onAdd} />}
    </div>
  );
};

export default RowTypeB
