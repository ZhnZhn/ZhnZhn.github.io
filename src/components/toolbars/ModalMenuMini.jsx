import {
  bindTo,
  useMemo
} from '../uiApi';
import {
  CL_ROW_PANE_TOPIC,
  crElementBorderCn
} from '../styleFn';

import {
  crItem,
  crSliderMenu
} from '../menuModelFn';
import ModalSlider from '../zhn-modal-slider/ModalSlider';

import { S_MODAL_MENU } from './ModalMenu.Style';

const CL_MENU_SLIDER = crElementBorderCn();

const _crModel = (
  configs,
  onClickItem
) => crSliderMenu(
  CL_ROW_PANE_TOPIC,
  160,
  1, {
    p0: (configs || []).map(({ btTitle }) => {
      return crItem(btTitle, bindTo(onClickItem, btTitle), false)
    })
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
    <ModalSlider
      isShow={isShow}
      className={CL_MENU_SLIDER}
      style={{...S_MODAL_MENU, ...style}}
      model={_model}
      onClose={onClose}
    />
  );
};

export default ModalMenuMini
