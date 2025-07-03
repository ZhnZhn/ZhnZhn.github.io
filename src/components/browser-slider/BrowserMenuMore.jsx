import ModalPopup from '../zhn-moleculs/ModalPopup';
import InputSwitch from '../zhn/InputSwitch';

const CL_MENU_MORE = 'charts__menu-more'
, S_MENU = {
  width: 240,
  paddingBottom: 8
}
, S_FILTER_TOPIC = {
  padding: '12px 12px 0 12px'
};

const BrowserMenuMore = ({
  is,
  toggleMenu,
  toggleFilter
}) => (
  <ModalPopup
    isShow={is}
    className={CL_MENU_MORE}
    style={S_MENU}
    onClose={toggleMenu}
  >
    <InputSwitch
      style={S_FILTER_TOPIC}
      caption="Filter Not Active Topic"
      onToggle={toggleFilter}
    />
  </ModalPopup>
);

export default BrowserMenuMore
