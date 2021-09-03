import ModalPopup from '../zhn-moleculs/ModalPopup';
import RowCheckBox from '../dialogs/rows/RowCheckBox';

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
    <RowCheckBox
      caption="Filter Not Active Topic"
      onToggle={toggleFilter}
    />
  </ModalPopup>
);

export default BrowserMenuMore
