import { useCallback } from 'react';

import ModalPopup from '../../zhn-moleculs/ModalPopup';
import RowCheckBox from '../rows/RowCheckBox';
import {
  CL_POPUP_MENU,
  S_MODAL_POPUP,
  S_ROW_CHB
} from './Style';

const ModalOptions = ({
  isShow,
  style,
  className=CL_POPUP_MENU,
  toggleOption,
  onClose
}) => {
  const _toggleZoomMinMax = useCallback(
    is => toggleOption('isNotZoomToMinMax', is),
  [toggleOption])
  , _toggleFilterZero = useCallback(
    is => toggleOption('isFilterZero', is),
  [toggleOption]);
  return (
  <ModalPopup
    isShow={isShow}
    style={{...S_MODAL_POPUP, ...style}}
    className={className}
    onClose={onClose}
  >
    <RowCheckBox
      initValue={false}
      style={S_ROW_CHB}
      caption="Not Zoom to Min-Max"
      onToggle={_toggleZoomMinMax}
    />
    <RowCheckBox
      initValue={false}
      style={S_ROW_CHB}
      caption="Filter Trim Zero Values"
      onToggle={_toggleFilterZero}
    />
  </ModalPopup>
 );
}

export default ModalOptions
