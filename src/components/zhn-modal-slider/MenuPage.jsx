import { 
  useRef,
  useCallback,
  useEffect
} from 'react';

import MenuTitle from './MenuTitle';
import MenuItemList from './MenuItemList';

const _fFocus = ref => () => {
  if (ref && ref.current) {
    ref.current.focus()
  }
};

const DF_ITEMS = [];

const MenuPage = ({
  isShow,
  style,
  title,
  titleCl,
  itemCl,
  pageCurrent,
  pageNumber,
  items=DF_ITEMS,
  onNextPage,
  onPrevPage,
  onClose,
  children
}) => {
  const _refTitle = useRef()
  , _refFirst = useRef()
  , _hClickTitle = useCallback(() => {
      onPrevPage(pageNumber)
  }, [onPrevPage, pageNumber])
  , _isFocus = (pageCurrent === pageNumber) && isShow;

 useEffect(() => {
   if (_isFocus) {
     if (_refTitle.current) {
        setTimeout(_fFocus(_refTitle), 1000)
     } else if (_refFirst.current) {
        setTimeout(_fFocus(_refFirst), 1000)
     }
   }
 })

 return (
    <div style={style}>
      <MenuTitle
        ref={_refTitle}
        titleCl={titleCl}
        title={title}
        onClick={_hClickTitle}
      />
      <MenuItemList
        ref={_refFirst}
        items={items}
        itemCl={itemCl || titleCl}
        pageNumber={pageNumber}
        onNextPage={onNextPage}
        onClose={onClose}
      />
      {children}
    </div>
  );
}

/*
MenuPage.propTypes = {
  isShow: PropTypes.bool,
  style: PropTypes.object,
  title: PropTypes.string,
  titleCl: PropTypes.string,
  itemCl: PropTypes.string,
  pageCurrent: PropTypes.number,
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
