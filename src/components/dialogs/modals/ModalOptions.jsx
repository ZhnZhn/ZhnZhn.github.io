import { crInputNumberProps } from '../../inputFn';

import ModalPopup from '../../zhn-moleculs/ModalPopup';
import InputText from '../../zhn/InputText';
import { SpanBoldBlack } from '../../zhn/SpanToken';
import InputSwitch from '../../zhn/InputSwitch';

import {
  S_MODAL_POPUP,
  S_ROW
} from './Style';

const S_DIV_INPUT = {
  margin: '6px 0 10px 0'
}
, S_CAPTION = {
  paddingRight: 4,
  fontSize: '16px'
}
, S_WIDTH_110 = {
  width: '110%'
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

const ModalOptions = ({
  isShow,
  style,
  className,
  dfRt,
  onRoundTo,
  toggleOption,
  onClose
}) => (
  <ModalPopup
    isShow={isShow}
    style={{...S_MODAL_POPUP, ...style}}
    className={className}
    onClose={onClose}
  >
    {/*eslint-disable jsx-a11y/label-has-associated-control*/}
    {onRoundTo && _isRt(dfRt) && <div style={S_DIV_INPUT}>
        <label>
          <SpanBoldBlack style={S_CAPTION}>Round Decimals to</SpanBoldBlack>
          <InputText
            {...crInputNumberProps(dfRt, MIN_RT, MAX_RT)}
            onChange={onRoundTo}
            onEnter={onClose}
          />
        </label>
      </div>
    }
    {/*eslint-enable jsx-a11y/label-has-associated-control*/}
    {ROW_CHECKBOX_CONFIGS.map(([id, caption]) => (
       <InputSwitch
          key={id}
          style={{...S_ROW, ...S_WIDTH_110}}
          caption={caption}
          onCheck={() => toggleOption(!0, id)}
          onUnCheck={() => toggleOption(!1, id)}
       />
    ))}
  </ModalPopup>
);

export default ModalOptions
