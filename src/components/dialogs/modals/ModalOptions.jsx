import ModalPopup from '../../zhn-moleculs/ModalPopup';
import RowCheckBox2 from '../rows/RowCheckBox2';
import {
  CL_POPUP_MENU,
  S_MODAL_POPUP,
  S_ROW_CHB
} from './Style';

const ROW_CHECKBOX_CONFIGS = [
  ["isNotZoomToMinMax", "Not Zoom to Min-Max"],
  ["isFilterZero", "Filter Trim Zero Values"],
  ["isLogarithmic", "Logarithmic Scale"]
];

const ModalOptions = ({
  isShow,
  style,
  className=CL_POPUP_MENU,
  toggleOption,
  onClose
}) => (
  <ModalPopup
    isShow={isShow}
    style={{...S_MODAL_POPUP, ...style}}
    className={className}
    onClose={onClose}
  >
    {ROW_CHECKBOX_CONFIGS.map(([id, caption]) => (
       <RowCheckBox2
          key={id}
          style={S_ROW_CHB}
          caption={caption}
          onToggle={toggleOption}
          id={id}
       />
    ))}
  </ModalPopup>
);

export default ModalOptions
