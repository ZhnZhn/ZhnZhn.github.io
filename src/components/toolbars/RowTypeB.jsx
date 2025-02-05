import { useState } from '../uiApi';

import InputText from '../zhn/InputText';
import { SvgPlus } from '../zhn/BtSvgCircle';
import { SpanBoldBlack } from '../zhn/SpanToken';

const S_CAPTION = {
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
      <SpanBoldBlack style={S_CAPTION}>
        {caption}
      </SpanBoldBlack>
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
