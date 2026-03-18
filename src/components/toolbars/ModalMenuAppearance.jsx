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
    _refItemWidth
  ] = useModalPopup()
  /*eslint-disable react-hooks/exhaustive-deps */
  , [
    _toggleJenksGroup,
    _toggleItemLabels,
    _onItemWidth
  ]= useMemo(() => [
    (is) => getChart().zhJenksGroup(is),
    (is) => getChart().zhItemLabels(is),
    () => {
      const pointWidth = parseFloat(getInputValue(_refItemWidth));
      if (pointWidth > 0 && pointWidth < 21) {
        getChart().zhSetItemWidth(pointWidth)
      }
    }
  ], []);
  // getChart
  /*eslint-enable react-hooks/exhaustive-deps */

  return (
    <div style={S_MENU_PANE}>
      <InputSwitch
        refEl={refFirstItem}
        caption="Item Labels"
        style={S_INPUT_SWITCH}
        onToggle={_toggleItemLabels}
      />
      <InputSwitch
        caption="Jenks Group"
        style={S_INPUT_SWITCH}
        onToggle={_toggleJenksGroup}
      />
      <RowCaptionInput
        refEl={_refItemWidth}
        caption="Item Width"
        isBtAdd={!1}
        captionStyle={S_CAPTION_STYLE}
        initValue={4}
        min={1}
        max={99}
        onAdd={_onItemWidth}
      />
    </div>
  );
};

export default crModalPopup(ModalMenuAppearanceView)
