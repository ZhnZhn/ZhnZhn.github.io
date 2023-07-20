import { useState } from '../uiApi';
import A from '../zhn/A';

const S_CAPTION = {
  display: 'inline-block',
  color: 'black',
  width: 120,
  fontWeight: 'bold',
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
      <span style={S_CAPTION}>
        {caption}
      </span>
      <A.InputText
         ref={forwardRef}
         type="number"
         style={S_INPUT_TEXT}
         initValue={initValue}
         maxLength={maxLength}
         min={min}
         max={max}
         onEnter={_onAdd}
      />
      {isPlus && <A.SvgPlus onClick={_onAdd} />}
    </div>
  );
};

export default RowTypeB
