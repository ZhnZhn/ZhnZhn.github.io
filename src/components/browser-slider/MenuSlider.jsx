import {
  useRef,
  useState,
  getRefValue,
  setRefValue
} from '../uiApi';

import useThrottleCallback from '../hooks/useThrottleCallback';

import fOnClickItem from './factoryClickItem';
import loadItems from './loadItems';

import PageList from './PageList';

const PAGE_WIDTH = 300
const S_ROOT = {
  width: PAGE_WIDTH,
  overflow: 'hidden'
}
, S_PAGES = {
  width: 5*PAGE_WIDTH,
  overflowX: 'hidden',
  display: 'flex',
  flexFlow: 'row nowrap',
  alignItems: 'flex-start',
  transition: 'all 750ms ease-out'
}
, S_PAGE = { width: PAGE_WIDTH };

const _getTranslateX = (element) => {
  const _prevStr = element
    .style.transform
    .trim()
    .slice(11)
    .replace('px', '')
    .replace(')', '');
  return parseInt(_prevStr, 10);
}

const _crPagesStyle = (
  refMenu,
  refDirection
) => {
  const _menuNode = getRefValue(refMenu)
  , _direction = getRefValue(refDirection)
  , dX = _direction !== 0 && _menuNode
     ? (
         setRefValue(refDirection, 0),
         _getTranslateX(_menuNode) - 1 * _direction * PAGE_WIDTH
       )
     : _direction === 0 && _menuNode
          ? _getTranslateX(_menuNode)
          : 0;

  return {
    ...S_PAGES,
    transform: `translateX(${dX}px)`
  };
};

const MenuSlider = ({
  dfProps,
  getProxy
}) => {
  const _refMenu = useRef()
  , _refDirection = useRef(0)
  , [{
       pageCurrent,
       pages
    },
    setState
  ] = useState({
    pageCurrent: 0,
    pages: [{
      id: "",
      title: "Menu"
    }]
  })
  , _hPrevPage = useThrottleCallback(pageNumber => {
       setState(prevState => {
         const { pageCurrent } = prevState;
         return pageCurrent === 0 || pageCurrent !== pageNumber
           ? prevState
           : setRefValue(_refDirection, -1), {
              ...prevState,
              pageCurrent: pageNumber - 1
           };
       })
  })
  , _hNextPage = useThrottleCallback((
      id,
      title,
      pageNumber
    ) => {
      setState(prevState => {
        const { pageCurrent, pages } = prevState;
        if (pageNumber !== pageCurrent) {
          return prevState;
        }
        const _nextPageNumber = pageNumber + 1
        , { id:_id } = pages[_nextPageNumber] || {};
        if (id && _id !== id) {
          pages.splice(_nextPageNumber)
          pages.push({ id, title })
        }
        setRefValue(_refDirection, 1)
        return {
          pages,
          pageCurrent: pageNumber + 1
        };
     })
  }, [_hPrevPage])
  , _pagesStyle = _crPagesStyle(_refMenu, _refDirection);

  return (
    <div style={S_ROOT}>
      <div
        ref={_refMenu}
        style={_pagesStyle}
      >
        <PageList
          pages={pages}
          pageCurrent={pageCurrent}
          style={S_PAGE}
          dfProps={dfProps}
          onClickPrev={_hPrevPage}
          onClickNext={_hNextPage}
          loadItems={loadItems}
          fOnClickItem={fOnClickItem}
          getProxy={getProxy}
        />
      </div>
    </div>
  );
}

export default MenuSlider
