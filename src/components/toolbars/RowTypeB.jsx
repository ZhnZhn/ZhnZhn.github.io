import { useState } from '../uiApi';

import InputText from '../zhn/InputText';
import { SvgPlus } from '../zhn/BtSvgCircle';
import SpanBlack from '../zhn/SpanBlack';

const S_CAPTION = {
  display: 'inline-block',
  width: 120,
  fontWeight: 'bold'
}
, S_INPUT_TEXT = {
  width: 46,
  marginRight: 12
};

const RowTypeB = ({
  forwardRef,
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
         ref={forwardRef}
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
