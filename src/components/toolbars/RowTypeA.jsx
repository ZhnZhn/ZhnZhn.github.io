import { useState } from '../uiApi';
import { CL_OPEN_CLOSE_BLACK } from '../styleFn';

import useProperty from '../hooks/useProperty';

import OpenClose from '../zhn/OpenClose';
import { SvgPlus } from '../zhn/BtSvgCircle';
import D from '../dialogs/DialogCell';
import {
  S_OPEN_CLOSE,
  S_OC_STYLE
} from './Row.Style';

const DF_COLOR = '#2b908f'
, _S_OC_STYLE = {
  ...S_OC_STYLE,
  marginRight: 6
}
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
  ] = _useRowTypeA(
    mathFn,
    getChart,
    dfColor
  );

  return (
    <OpenClose
      caption={caption}
      className={CL_OPEN_CLOSE_BLACK}
      style={S_OPEN_CLOSE}
      ocStyle={_S_OC_STYLE}
      CompAfter={compAfter}
    >
      <D.RowInputColor
        style={S_INPUT_COLOR}
        initValue={dfColor}
        onEnter={onColor}
      />
    </OpenClose>
  );
};

export default RowTypeA
