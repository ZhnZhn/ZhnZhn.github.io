import { useState } from '../uiApi';
import useProperty from '../hooks/useProperty';

import { SvgPlus } from '../zhn/BtSvgCircle';
import D from '../dialogs/DialogCell';
import { RowOpenClose } from './RowOpenClose';

const DF_COLOR = '#2b908f'
, S_INPUT_COLOR = { paddingLeft: 10 };

const useRowTypeA = (
  mathFn,
  getChart,
  dfColor
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

  return [compAfter, setColor];
};

const RowTypeA = ({
  caption,
  dfColor=DF_COLOR,
  mathFn,
  getChart
}) => {
  const [
    compAfter,
    onColor
  ] = useRowTypeA(
    mathFn,
    getChart,
    dfColor
  );

  return (
    <RowOpenClose
      caption={caption}      
      CompAfter={compAfter}
    >
      <D.RowInputColor
        style={S_INPUT_COLOR}
        initValue={dfColor}
        onEnter={onColor}
      />
    </RowOpenClose>
  );
};

export default RowTypeA
