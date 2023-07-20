import { useState } from '../uiApi';
import useProperty from '../hooks/useProperty';

import A from '../zhn/A';
import D from '../dialogs/DialogCell';

const DF_COLOR = '#2b908f'
, OC_COLOR = 'black'

, S_ROOT_OC = {
  lineHeight: 'unset',
  paddingBottom: 4,
  marginLeft: -8
}
, S_OC = {
  display: 'inline-block',
  height: 32,
  paddingTop: 4,
  width: 'auto',
  paddingRight: 8,
  marginRight: 6
}
, S_CAPTION = { color: OC_COLOR }
, S_INPUT_COLOR = { paddingLeft: 10 };


const _useRowTypeA = (
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
     : <A.SvgPlus onClick={_onPlus} />;

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
  ] = _useRowTypeA(
    mathFn,
    getChart,
    dfColor
  );

  return (
    <A.OpenClose
      caption={caption}
      style={S_ROOT_OC}
      ocStyle={S_OC}
      captionStyle={S_CAPTION}
      openColor={OC_COLOR}
      CompAfter={compAfter}
    >
      <D.RowInputColor
        style={S_INPUT_COLOR}
        initValue={dfColor}
        onEnter={onColor}
      />
    </A.OpenClose>
  );
};

export default RowTypeA
