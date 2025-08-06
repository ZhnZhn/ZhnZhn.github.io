import {
  crAbsoluteTopLeftStyle
} from '../styleFn';

import ModalPane from './ModalPane';
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
  <ModalPane
    isShow={isShow}
    style={S_MODAL_POPUP}
    onClose={onClose}
  >
    <CellColorPane
       model={model}
       onClickCell={onClickCell}
    />
  </ModalPane>
);

export default ModalPalette
