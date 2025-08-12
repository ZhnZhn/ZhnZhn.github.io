import {
  fCrModalPopup,
  useModalPopup
} from '../zhn-moleculs/ModalPopup';
import InputSwitch from '../zhn/InputSwitch';

const CL_MENU_MORE = 'charts__menu-more'
, S_MENU = {
  width: 240,
  paddingBottom: 8
}
, S_FILTER_TOPIC = {
  padding: '12px 12px 0 12px'
};

const BrowserMenuMoreView = ({
  toggleFilter
}) => {
  const refFirstItem = useModalPopup()[0];
  return (
    <InputSwitch
      refEl={refFirstItem}
      style={S_FILTER_TOPIC}
      caption="Filter Not Active Topic"
      onToggle={toggleFilter}
    />
  );
};

const BrowserMenuMore = fCrModalPopup(()=>({
  className: CL_MENU_MORE,
  style: S_MENU
}))(BrowserMenuMoreView)

export default BrowserMenuMore
