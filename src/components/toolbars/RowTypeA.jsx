import { useState } from '../uiApi';
import { useProperty } from '../hooks/useProperty';

import { SvgPlus } from '../zhn/BtSvgCircle';
import RowInputColor from '../dialogs/RowInputColor';
import { RowOpenClose } from './RowOpenClose';

const DF_COLOR = '#2b908f'
, S_INPUT_COLOR = { paddingLeft: 10 };

const useRowTypeA = (
  mathFn,
  getChart,
  dfColor = DF_COLOR
) => {
  const [
    is,
    setIs
  ] = useState(false)
  , [
    setColor,
    getColor
  ] = useProperty(dfColor)
  , _onPlus = () => {
     setIs(mathFn(getChart(), getColor()))
  }
  , compAfter = is
     ? null
     : <SvgPlus onClick={_onPlus} />;

  return [dfColor, compAfter, setColor];
};

const RowTypeA = (props) => {
  const [
    dfColor,
    compAfter,
    onColor
  ] = useRowTypeA(
    props.mathFn,
    props.getChart,
    props.dfColor
  );

  return (
    <RowOpenClose
      refEl={props.refEl}
      caption={props.caption}
      CompAfter={compAfter}
    >
      <RowInputColor
        style={S_INPUT_COLOR}
        initValue={dfColor}
        onEnter={onColor}
      />
    </RowOpenClose>
  );
};

export default RowTypeA
