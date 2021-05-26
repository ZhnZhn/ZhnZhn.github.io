import { useCallback } from 'react';

import ModalPopup from '../../zhn-moleculs/ModalPopup';
import RowCheckBox from '../rows/RowCheckBox';
import STYLE from './Style';

const ModalOptions = ({
  isShow,
  style,
  className=STYLE.CL,
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
    style={{...STYLE.ROOT, ...style}}
    className={className}
    onClose={onClose}
  >
    <RowCheckBox
      initValue={false}
      style={STYLE.ROW_CHB}
      caption="Not Zoom to Min-Max"
      onToggle={_toggleZoomMinMax}
    />
    <RowCheckBox
      initValue={false}
      style={STYLE.ROW_CHB}
      caption="Filter Trim Zero Values"
      onToggle={_toggleFilterZero}
    />
  </ModalPopup>
 );
}

export default ModalOptions
