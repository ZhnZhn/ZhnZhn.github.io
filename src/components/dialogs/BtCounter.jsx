import { forwardRef, useState, useCallback, useImperativeHandle } from 'react'

import ButtonCircle from '../zhn/ButtonCircle'

const BtCounter = forwardRef(({
  isShow,
  style,
  title,
  initialValue=1,
  maxValue=4,
}, ref) => {
  const [value, setValue] = useState(initialValue)
  , _onClick = useCallback(() => {
     if (value < maxValue) {
       setValue(v => v+1)
     } else {
       setValue(1)
     }
   }, [value, maxValue]);

  useImperativeHandle(ref, () => ({
     getValue: () => value
  }), [value])

  return isShow ? (
    <ButtonCircle
      style={style}
      title={title}
      caption={value}
      onClick={_onClick}
    />
  ) : null;
})

export default BtCounter
