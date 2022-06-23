import { useMemo } from 'react';

import ModalPopup from '../../zhn-moleculs/ModalPopup';
import RowCheckBox from '../rows/RowCheckBox';
import {
  CL_POPUP_MENU,
  S_MODAL_POPUP,
  S_ROW_CHB
} from './Style';

const PROP_NAMES = [
  'isNotZoomToMinMax',
  'isFilterZero',
  'isLogarithmic'
];

const ModalOptions = ({
  isShow,
  style,
  className=CL_POPUP_MENU,
  toggleOption,
  onClose
}) => {
  const [
    _toggleZoomMinMax,
    _toggleFilterZero,
    _toggleLogarithmic
  ] = useMemo(() => PROP_NAMES
       .map(propName =>
          is => toggleOption(propName, is)
       )
  , [toggleOption]);
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
    <RowCheckBox
      initValue={false}
      style={S_ROW_CHB}
      caption="Logarithmic Scale"
      onToggle={_toggleLogarithmic}
    />
  </ModalPopup>
 );
}

export default ModalOptions
