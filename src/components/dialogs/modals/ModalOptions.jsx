import {
  CL_CHB_BLACK,
  CL_BLACK
} from '../../styleFn';

import ModalPopup from '../../zhn-moleculs/ModalPopup';
import InputText from '../../zhn/InputText';
import { SpanBlack } from '../../zhn/SpanToken';
import RowCheckBox2 from '../rows/RowCheckBox2';
import {
  CL_POPUP_MENU,
  S_MODAL_POPUP,
  S_ROW
} from './Style';

const S_DIV_INPUT = {
  margin: '6px 0'
}
const S_CAPTION = {
  paddingRight: 4,
  fontSize: '16px',
  fontWeight: 'bold'
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
  className=CL_POPUP_MENU,
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
          <SpanBlack style={S_CAPTION}>Round Decimals to</SpanBlack>
          <InputText
            type="number"
            initValue={dfRt}
            min={MIN_RT}
            max={MAX_RT}
            step={1}
            maxLength={2}
            onChange={onRoundTo}
            onEnter={onClose}
          />
        </label>
      </div>
    }
    {/*eslint-enable jsx-a11y/label-has-associated-control*/}
    {ROW_CHECKBOX_CONFIGS.map(([id, caption]) => (
       <RowCheckBox2
          key={id}
          id={id}
          style={S_ROW}
          chbCn={CL_CHB_BLACK}
          btCn={CL_BLACK}
          caption={caption}
          onToggle={toggleOption}
       />
    ))}
  </ModalPopup>
);

export default ModalOptions
