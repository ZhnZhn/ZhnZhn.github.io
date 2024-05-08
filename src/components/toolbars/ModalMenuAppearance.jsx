import {
  useRef,
  useMemo,
  getInputValue
} from '../uiApi';
import {
  CL_CHB_BLACK,
  CL_BLACK
} from '../styleFn';

import ModalPopup from '../zhn-moleculs/ModalPopup';
import RowCheckBox1 from '../dialogs/rows/RowCheckBox1';
import RowCaptionInput from './RowCaptionInput'
import {
  S_MODAL_MENU,
  S_MENU_PANE
} from './ModalMenu.Style';

const S_CHB = { padding: 0 }
, S_ROW_INPUT = {
  paddingTop: 5,
  paddingLeft: 5
}
, S_CAPTION_STYLE = { width: void 0};

const ModalMenuAppearance = ({
  style,
  isShow,
  onClose,
  getChart,
  config
}) => {
  /*eslint-disable react-hooks/exhaustive-deps */
  const _refPointWidth = useRef()
  , [
    _enableCategoryLabels,
    _disableCategoryLabels,
    _onPointWidth
  ]= useMemo(() => [
    () => {
      getChart().zhDataLabels(true)
    },
    () => {
      getChart().zhDataLabels(false)
    },
    () => {
      const pointWidth = parseFloat(getInputValue(_refPointWidth));
      if (pointWidth > 0 && pointWidth < 21) {
        getChart().zhSetPointWidth(pointWidth)
      }
    }
  ], []);
  // getChart
  /*eslint-enable react-hooks/exhaustive-deps */

  return (
    <ModalPopup
      style={{...S_MODAL_MENU, ...style}}
      isShow={isShow}
      onClose={onClose}
    >
      <div style={S_MENU_PANE}>
        <RowCheckBox1
          caption="Data Labels"
          style={S_CHB}
          chbCn={CL_CHB_BLACK}
          btCn={CL_BLACK}
          onCheck={_enableCategoryLabels}
          onUnCheck={_disableCategoryLabels}
        />
        <RowCaptionInput
          refEl={_refPointWidth}
          caption="Point Width"
          isBtAdd={false}
          style={S_ROW_INPUT}
          captionStyle={S_CAPTION_STYLE}          
          initValue={4}
          maxLength={2}
          onAdd={_onPointWidth}
        />
      </div>
    </ModalPopup>
  );
};

export default ModalMenuAppearance
