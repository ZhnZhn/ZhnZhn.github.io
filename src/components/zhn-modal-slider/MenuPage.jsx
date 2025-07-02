import { useRef } from '../uiApi';

import useItemsFocusTrap from '../hooks/useItemsFocusTrap';
import useGetRefValue2 from '../hooks/useGetRefValue2';
import { useAsyncFocusFirstItemIf } from '../hooks/useFocus';

import FocusTrap from '../zhn-moleculs/FocusTrap';
import MenuTitle from './MenuTitle';
import MenuItemList from './MenuItemList';

const MenuPage = (props) => {
  const _refTitle = useRef()
  , [
    _getRefFocus,
    _refLastItem,
    _refFirstItem
  ] = useItemsFocusTrap(props.items)
  , _getFocusFirstItem = useGetRefValue2(
    _refTitle,
    _refFirstItem
  );

  useAsyncFocusFirstItemIf(
    props.isVisible,
    _getFocusFirstItem
  );

  return (
    <div style={props.style}>
      <FocusTrap
        refFirst={_getFocusFirstItem}
        refLast={_refLastItem}
      >
        <MenuTitle
          refEl={_refTitle}
          titleCl={props.titleCl}
          title={props.title}
          onClick={props.onPrevPage}
        />
        <MenuItemList
          getRefFocus={_getRefFocus}
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
