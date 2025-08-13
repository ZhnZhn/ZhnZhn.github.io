import { crVisibilityHidden } from '../styleFn';

import { useItemsFocusTrap } from '../hooks/useFocus';
import useCanBeHidden from './useCanBeHidden';

import FocusTrap from '../zhn-moleculs/FocusTrap';
import MenuTitle from './MenuTitle';
import MenuItemList from './MenuItemList';

const MenuPage = (props) => {
  const [
    _refFirstItem,
    _refLastItem,
    _getRefItem
  ] = useItemsFocusTrap(
    props.items,
    props.isVisible,
    !props.title
  )
  , _style = useCanBeHidden(
    props.canBeHidden
  );

  return (
    <div style={{
      ...props.style,
      ...crVisibilityHidden(props.isVisible),
      ..._style
    }}>
      <FocusTrap
        refFirst={_refFirstItem}
        refLast={_refLastItem}
      >
        <MenuTitle
          refEl={_refFirstItem}
          titleCl={props.titleCl}
          title={props.title}
          onClick={props.onPrevPage}
        />
        <MenuItemList
          getRefItem={_getRefItem}
          items={props.items}
          itemCl={props.itemCl}
          pageNumber={props.pageNumber}
          onNextPage={props.onNextPage}
          onClose={props.onClose}
        />
        {props.children}
      </FocusTrap>
    </div>
  );
}

/*
MenuPage.propTypes = {
  isVisible: PropTypes.bool,
  canBeHidden: PropTypes.bool,
  style: PropTypes.object,
  title: PropTypes.string,
  titleCl: PropTypes.string,
  itemCl: PropTypes.string,
  pageNumber: PropTypes.number,
  items: PropTypes.arrayOf(
     PropTypes.shapeOf({
        cn: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        id: PropTypes.string,
        isClose: PropTypes.bool,
        onClick: PropTypes.func
     })
  ),
  onNextPage: PropTypes.func,
  onPrevPage: PropTypes.func,
  onClose: PropTypes.func
}
*/

export default MenuPage
