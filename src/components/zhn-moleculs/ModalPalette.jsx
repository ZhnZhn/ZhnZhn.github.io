import {
  crAbsoluteTopLeftStyle
} from '../styleFn';

import ModalPopup from './ModalPopup';
import CellColorPane from './CellColorPane';

const S_MODAL_POPUP = {
  ...crAbsoluteTopLeftStyle(38, -10),
  zIndex: 1010
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
