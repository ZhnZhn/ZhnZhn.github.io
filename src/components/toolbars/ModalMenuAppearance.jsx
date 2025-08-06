import {
  useRef,
  useMemo,
  getInputValue
} from '../uiApi';
import {
  CL_CHB_BLACK,
  CL_BLACK
} from '../styleFn';

import ModalPane from '../zhn-moleculs/ModalPane';
import RowCheckBox1 from '../dialogs/rows/RowCheckBox1';
import RowCaptionInput from './RowCaptionInput'
import { S_MODAL_MENU } from './ModalMenu.Style';

const S_MENU_PANE = {
  margin: "6px 2px 8px 6px"
},
S_CHB = {
  padding: 0
}
, S_ROW_INPUT = {
  paddingTop: 5,
  paddingLeft: 5
}
, S_CAPTION_STYLE = {
  width: void 0
};

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
      getChart().zhDataLabels(!0)
    },
    () => {
      getChart().zhDataLabels(!1)
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
    <ModalPane
      isShow={isShow}
      style={{...S_MODAL_MENU, ...style}}
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
          isBtAdd={!1}
          style={S_ROW_INPUT}
          captionStyle={S_CAPTION_STYLE}
          initValue={4}
          min={1}
          max={99}
          onAdd={_onPointWidth}
        />
      </div>
    </ModalPane>
  );
};

export default ModalMenuAppearance
