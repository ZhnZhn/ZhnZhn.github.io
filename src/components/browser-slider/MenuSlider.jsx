import {
  useRef,
  useState,
  useCallback
} from 'react';

import throttleOnce from '../../utils/throttleOnce';
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

const _getRefValue = ref => ref.current;
const _setRefValue = (
  ref,
  value
) => ref.current = value

const _getTranslateX = (node) => {
  const _prevStr = node
    .style.transform
    .substring(11)
    .replace('px', '')
    .replace(')', '');
  return parseInt(_prevStr, 10);
}

const _crPagesStyle = (
  refMenu,
  refDirection
) => {
  const _menuNode = _getRefValue(refMenu)
  , _direction = _getRefValue(refDirection)
  , dX = _direction !== 0 && _menuNode
     ? (
         _setRefValue(refDirection, 0),
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

const INITIAL_STATE = {
  pageCurrent: 0,
  pages: [{
    id: "",
    title: "Menu"
  }]
};

const MenuSlider = ({
  dfProps,
  store
}) => {
  const _refMenu = useRef()
  , _refDirection = useRef(0)
  , [{
       pageCurrent,
       pages
    },
    setState
  ] = useState(INITIAL_STATE)
  /*eslint-disable react-hooks/exhaustive-deps */
  , _hPrevPage = useCallback(throttleOnce((pageNumber) => {
       setState(prevState => {
         const { pageCurrent } = prevState;
         return pageCurrent === 0 || pageCurrent !== pageNumber
           ? prevState
           : _setRefValue(_refDirection, -1), {
              ...prevState,
              pageCurrent: pageNumber - 1
           };
       })
  }), [])
  , _hNextPage = useCallback(throttleOnce((
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
        _setRefValue(_refDirection, 1)
        return {
          pages,
          pageCurrent: pageNumber + 1
        };
     })
  }), [_hPrevPage])
  /*eslint-enable react-hooks/exhaustive-deps */
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
          store={store}
          dfProps={dfProps}
          onClickPrev={_hPrevPage}
          onClickNext={_hNextPage}
          loadItems={loadItems}
          fOnClickItem={fOnClickItem}
        />
      </div>
    </div>
  );
}

export default MenuSlider
