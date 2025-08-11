import { S_INLINE } from '../../styleFn';
import { crInputNumberProps } from '../../inputFn';

import InputText from '../../zhn/InputText';
import { SpanBoldBlack } from '../../zhn/SpanToken';
import InputSwitch from '../../zhn/InputSwitch';

import { useModalPopup } from '../../zhn-moleculs/ModalPopup';

import { S_ROW } from './Style';

const S_LABEL_ROUND_TO = {
  ...S_INLINE,
  margin: '8px 0'
}
, S_CAPTION = {
  paddingRight: 4
};

const MIN_RT = 0, MAX_RT = 3;
const _isRt = (
  rt
) => rt === ''
  || (rt>=MIN_RT && rt<=MAX_RT)

const ROW_CHECKBOX_CONFIGS = [
  ["isNotZoomToMinMax", "Not Zoom to Min-Max"],
  ["isFilterZero", "Filter-Trim Zeros"],
  ["isLogarithmic", "Logarithmic Scale"]
];

const ModalOptionsView = ({
  isShow,
  style,
  className,
  dfRt,
  onRoundTo,
  toggleOption,
  onClose
}) => {
  const [
    _refFirstItem,
    _refLastItem
  ] = useModalPopup()
  , _isInputRoundTo = onRoundTo && _isRt(dfRt);
  return (<>
    {/*eslint-disable jsx-a11y/label-has-associated-control*/}
    {_isInputRoundTo && <label style={S_LABEL_ROUND_TO}>
        <SpanBoldBlack style={S_CAPTION}>Round Decimals to</SpanBoldBlack>
        <InputText
          {...crInputNumberProps(dfRt, MIN_RT, MAX_RT)}
          refEl={_refFirstItem}
          onChange={onRoundTo}
          onEnter={onClose}
        />
      </label>
    }
    {/*eslint-enable jsx-a11y/label-has-associated-control*/}
    {ROW_CHECKBOX_CONFIGS.map(([id, caption], index) => (
       <InputSwitch
          key={id}
          refEl={index === 0 && !_isInputRoundTo
            ? _refFirstItem
            : index === ROW_CHECKBOX_CONFIGS.length - 1
            ? _refLastItem
            : void 0}
          style={S_ROW}
          caption={caption}
          onCheck={() => toggleOption(!0, id)}
          onUnCheck={() => toggleOption(!1, id)}
       />
    ))}
  </>);
}

export default ModalOptionsView
