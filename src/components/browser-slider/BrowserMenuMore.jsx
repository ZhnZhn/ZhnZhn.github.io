import ModalPopup from '../zhn-moleculs/ModalPopup';
import RowCheckBox2 from '../dialogs/rows/RowCheckBox2';

const CL_MENU_MORE = 'popup-menu charts__menu-more'
, S_MENU = {
  width: 240,
  paddingBottom: 8
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
    <RowCheckBox2
      caption="Filter Not Active Topic"
      onToggle={toggleFilter}
    />
  </ModalPopup>
);

export default BrowserMenuMore
