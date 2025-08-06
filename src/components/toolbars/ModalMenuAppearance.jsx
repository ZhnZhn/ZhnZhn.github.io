import {
  useRef,
  useMemo,
  getInputValue
} from '../uiApi';

import ModalPane from '../zhn-moleculs/ModalPane';
import InputSwitch from '../zhn/InputSwitch';
import RowCaptionInput from './RowCaptionInput';
import { S_MODAL_MENU } from './ModalMenu.Style';

const S_MENU_PANE = {
  margin: "12px 0px 10px 10px"
}
, S_INPUT_SWITCH = {
  lineHeight: 'initial',
  padding: '0px 12px 14px 0px'
}
, S_CAPTION_STYLE = {
  width: void 0,
  paddingRight: 4
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
    _toggleDataLabels,
    _onPointWidth
  ]= useMemo(() => [
    (is) => getChart().zhDataLabels(is),
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
        <InputSwitch
          caption="Data Labels"
          style={S_INPUT_SWITCH}
          onToggle={_toggleDataLabels}
        />
        <RowCaptionInput
          refEl={_refPointWidth}
          caption="Point Width"
          isBtAdd={!1}
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
