import {
  bindTo,
  useMemo
} from '../uiApi';
import {
  CL_ROW_PANE_TOPIC
} from '../styleFn';

import {
  crItem,
  addToggleTo,
  crSliderMenu
} from '../menuModelFn';
import {
  ModalSliderMemoIsShow
} from '../zhn-modal-slider/ModalSlider';

import {
  S_MODAL_MENU
} from './ModalMenu.Style';

const _crModel = (
  configs,
  onClickItem
) => crSliderMenu(
  CL_ROW_PANE_TOPIC,
  160,
  1, {
    p0: (configs || []).map(({ btTitle }) => addToggleTo(crItem(
      btTitle,
      bindTo(onClickItem, btTitle),
      !1
    )))
  }
);

const ModalMenuMini = ({
  isShow,
  style,
  onClose,
  configs,
  onClickItem
}) => {
  const _model = useMemo(
    () => _crModel(configs, onClickItem),
    [configs, onClickItem]
  );
  return (
    <ModalSliderMemoIsShow
      isShow={isShow}
      style={{...S_MODAL_MENU, ...style}}
      model={_model}
      onClose={onClose}
    />
  );
};

export default ModalMenuMini
