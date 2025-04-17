import {
  S_BOX_SHADOW,
  crAbsoluteTopLeftStyle
} from '../styleFn';

import ModalPopup from './ModalPopup';
import CellColorPane from './CellColorPane';

const S_MODAL_POPUP = {
  ...S_BOX_SHADOW,
  ...crAbsoluteTopLeftStyle(35, -10),
  zIndex: 1010,
  backgroundColor: 'inherit'
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
