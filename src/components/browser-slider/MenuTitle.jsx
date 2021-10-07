import isKeyEnter from '../zhn/isKeyEnter';
import {
  S_TITLE,
  S_TITLE_ARROW
} from './Style';

const CL_MENU_ITEM = 'menu-item';

const MenuTitle = ({ innerRef, title, onClick }) => {
  const _hKeyDown = (evt) => {
    if (isKeyEnter(evt)) {
      evt.preventDefault()
      onClick()
    }
  };
  return (
    <div
      ref={innerRef}
      className={CL_MENU_ITEM}
      style={S_TITLE}
      role="menuitem"
      tabIndex="0"
      onClick={onClick}
      onKeyDown={_hKeyDown}
    >
      {title}
      <span style={S_TITLE_ARROW}>
        {'<'}
      </span>
    </div>
  );
}

/*
MenuTitle.propTypes = {
  innerRef: PropTypes.shape({
    current: PropTypes.object
  })
  title: PropTypes.string,
  onClick: PropTypes.func
}
*/

export default MenuTitle
