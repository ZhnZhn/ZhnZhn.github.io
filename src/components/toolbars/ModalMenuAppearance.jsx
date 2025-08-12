import {
  useMemo,
  getInputValue
} from '../uiApi';

import { useModalPopup } from '../zhn-moleculs/ModalPopup';
import crModalPopup from './crModalPopup';

import InputSwitch from '../zhn/InputSwitch';
import RowCaptionInput from './RowCaptionInput';

const S_MENU_PANE = {
  margin: "12px 0 10px 10px"
}
, S_INPUT_SWITCH = {
  padding: '0 12px 14px 0'
}
, S_CAPTION_STYLE = {
  width: void 0,
  paddingRight: 4
};

const ModalMenuAppearanceView = ({
  style,
  isShow,
  onClose,
  getChart,
  config
}) => {
  const [
    refFirstItem,
    _refPointWidth
  ] = useModalPopup()
  /*eslint-disable react-hooks/exhaustive-deps */
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
    <div style={S_MENU_PANE}>
      <InputSwitch
        refEl={refFirstItem}
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
  );
};

export default crModalPopup(ModalMenuAppearanceView)
