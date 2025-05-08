import { useState } from '../uiApi';
import { crInputNumberProps } from '../inputFn';

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
         {...crInputNumberProps(initValue, min, max)}
         refEl={refEl}
         style={S_INPUT_TEXT}
         onEnter={_onAdd}
      />
      {isPlus && <SvgPlus onClick={_onAdd} />}
    </div>
  );
};

export default RowTypeB
