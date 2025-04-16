import {
  crAbsoluteTopLeftStyle
} from '../styleFn';

import ModalPopup from './ModalPopup';
import CellColorPane from './CellColorPane';

const S_MODAL_POPUP = {
  ...crAbsoluteTopLeftStyle(35, -10),
  zIndex: 1010,  
  backgroundColor: 'inherit',
  borderRadius: 5,
  boxShadow: 'rgba(0, 0, 0, 0.2) 0 0 0 5px'
};

const ModalPalette = ({
  isShow,
  model,
  onClickCell,
  onClose
}) => (
  <ModalPopup
    style={S_MODAL_POPUP}
    isShow={isShow}
    onClose={onClose}
  >
    <CellColorPane
       model={model}
       onClickCell={onClickCell}
    />
  </ModalPopup>
);

export default ModalPalette
