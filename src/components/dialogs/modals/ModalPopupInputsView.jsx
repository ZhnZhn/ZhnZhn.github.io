import { useModalPopup }  from '../../zhn-moleculs/ModalPopup';

import InputSwitch from '../../zhn/InputSwitch';
import { S_ROW_INPUT_SWITCH } from './Style';

const ModalPopupInputsView = (props) => {
  const [
    refFirstItem,
    refLastItem
  ] = useModalPopup();
  return (<>
    <InputSwitch
      key="isShowLabels"
      refEl={refFirstItem}
      style={S_ROW_INPUT_SWITCH}
      caption="Input Labels"
      initialValue={props.isShowLabels}
      onToggle={props.onToggleLabels}
    />
    {props.children(refLastItem)}
  </>);
}

export default ModalPopupInputsView
