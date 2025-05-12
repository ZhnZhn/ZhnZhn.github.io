import {
  useState,
  useCallback,
  useImperativeHandle
} from '../uiApi';

import ButtonCircle from '../zhn/ButtonCircle';

const BtCounter = ({
  refEl,
  style,
  title,
  initialValue=1,
  maxValue=4,
}) => {
  const [
    value,
    setValue
  ] = useState(initialValue)
  , _onClick = useCallback(() => {
     setValue(v => v < maxValue
        ? v + 1
        : initialValue
     )
   }, [maxValue, initialValue]);

  useImperativeHandle(refEl, () => ({
     getValue: () => value
  }), [value])

  return (
    <ButtonCircle
      style={style}
      title={title}
      caption={value}
      onClick={_onClick}
    />
  );
};

export default BtCounter
