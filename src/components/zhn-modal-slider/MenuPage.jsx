import {
  useRef,
  useCallback
} from '../uiApi';

import useItemsFocusTrap from '../hooks/useItemsFocusTrap';
import useGetRefValue2 from '../hooks/useGetRefValue2';
import { useAsyncFocusIf } from '../hooks/useFocus';

import FocusTrap from '../zhn-moleculs/FocusTrap';
import MenuTitle from './MenuTitle';
import MenuItemList from './MenuItemList';

const DF_ITEMS = [];
const FOCUS_ITEM_MLS = 350;

const MenuPage = ({
  isVisible,
  style,
  title,
  titleCl,
  itemCl,
  pageNumber,
  items=DF_ITEMS,
  onNextPage,
  onPrevPage,
  onClose,
  children
}) => {
  const _refTitle = useRef()
  , [
    _getRefFocus,
    _refLastItem,
    _refFirstItem
  ] = useItemsFocusTrap(items)
  , _getFocusFirstItem = useGetRefValue2(
    _refTitle,
    _refFirstItem
  )
  , _hClickTitle = useCallback(() => {
      onPrevPage(pageNumber)
  }, [onPrevPage, pageNumber]);

  useAsyncFocusIf(
    isVisible,
    _getFocusFirstItem,
    FOCUS_ITEM_MLS
  );

  return (
    <div style={style}>
      <FocusTrap
        refFirst={_getFocusFirstItem}
        refLast={_refLastItem}
      >
        <MenuTitle
          refEl={_refTitle}
          titleCl={titleCl}
          title={title}
          onClick={_hClickTitle}
        />
        <MenuItemList
          getRefFocus={_getRefFocus}
          items={items}
          itemCl={itemCl || titleCl}
          pageNumber={pageNumber}
          onNextPage={onNextPage}
          onClose={onClose}
        />
        {children}
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
