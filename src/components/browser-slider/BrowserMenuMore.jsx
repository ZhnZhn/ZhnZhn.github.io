import ModalPane from '../zhn-moleculs/ModalPane';
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
  <ModalPane
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
  </ModalPane>
);

export default BrowserMenuMore
