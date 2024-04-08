import { useMemo } from '../uiApi';
import {
  CL_CHB_BLACK,
  CL_BLACK
} from '../styleFn';

import ModalPopup from '../zhn-moleculs/ModalPopup';
import RowCheckBox1 from '../dialogs/rows/RowCheckBox1';
import { S_MODAL_MENU } from './ModalMenu.Style';

const S_PANE = { margin: '6px 10px 6px 6px' }
, S_CHB = { padding: 0 };

const ModalMenuAppearance = ({
  style,
  isShow,
  onClose,
  getChart,
  config
}) => {
  /*eslint-disable react-hooks/exhaustive-deps */
  const [
    _enableCategoryLabels,
    _disableCategoryLabels
  ]= useMemo(() => [
    () => {
      getChart().zhEnableDataLabels()
    },
    () => {
      getChart().zhDisableDataLabels()
    }
  ], [])
  // getChart
  /*eslint-enable react-hooks/exhaustive-deps */

  return (
    <ModalPopup
      style={{...S_MODAL_MENU, ...style}}
      isShow={isShow}
      onClose={onClose}
    >
      <div style={S_PANE}>
        <RowCheckBox1
          style={S_CHB}
          caption="Category Labels"
          chbCn={CL_CHB_BLACK}
          btCn={CL_BLACK}
          onCheck={_enableCategoryLabels}
          onUnCheck={_disableCategoryLabels}
        />
      </div>
    </ModalPopup>
  );
};

export default ModalMenuAppearance
