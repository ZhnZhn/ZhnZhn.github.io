import { useState } from '../uiApi';
import { CL_OPEN_CLOSE_BLACK } from '../styleFn';

import useProperty from '../hooks/useProperty';

import OpenClose from '../zhn/OpenClose';
import { SvgPlus } from '../zhn/BtSvgCircle';
import D from '../dialogs/DialogCell';
import {
  S_ROOT_OC,
  S_OC
} from './Row.Style';

const DF_COLOR = '#2b908f'
, _S_OC = {
  ...S_OC,
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
      style={S_ROOT_OC}
      ocStyle={_S_OC}
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
