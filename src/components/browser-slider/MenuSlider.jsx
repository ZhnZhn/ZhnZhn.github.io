import {
  useRef,
  useState,
  useCallback
} from 'react';

import throttleOnce from '../../utils/throttleOnce';
import fOnClickItem from './factoryClickItem';
import loadItems from './loadItems';

import Frame from './Frame';
import PageList from './PageList';

const S_ROOT = {
  width: 300,
  overflow: 'hidden'
}
, S_PAGES = {
  width: 1500,
  overflowX: 'hidden',
  display: 'flex',
  flexFlow: 'row nowrap',
  alignItems: 'flex-start',
  transition: 'all 750ms ease-out'
}
, S_PAGE = { width: 300 };

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
  let dX = '0';
  const _menuNode = _getRefValue(refMenu)
  , _direction = _getRefValue(refDirection);
  if (_direction !== 0 && _menuNode) {
    const _prevInt = _getTranslateX(_menuNode);
    dX = _direction === 1
      ? _prevInt-300
      : _prevInt+300
    _setRefValue(refDirection, 0)
  } else if (_direction === 0 && _menuNode) {
    dX = _getTranslateX(_menuNode);
  }

  return {
    ...S_PAGES,
    transform: `translateX(${dX}px)`
  };
};

const MenuSlider = ({
  dfProps,
  store
}) => {
  const _refMenu = useRef()
  , _refDirection = useRef(0)
  , [state, setState] = useState({
    pageCurrent: 0,
    pages: []
  })
  , {
    pageCurrent,
    pages
  } = state
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
      const _addPageTo = (
        pages,
        id,
        title
      ) => {
        pages.push((
          <Frame
            key={id}
            id={id}
            style={S_PAGE}
            store={store}
            title={title}
            dfProps={dfProps}
            onClickPrev={_hPrevPage}
            onClickNext={_hNextPage}
            loadItems={loadItems}
            fOnClickItem={fOnClickItem}
          />
        ))
      }
      setState(prevState => {
        let { pageCurrent, pages } = prevState;
        if (pageNumber !== pageCurrent) {
          return prevState;
        }

        if (pageNumber < pages.length) {
          const _page = pages[pageNumber];
          if (_page && _page.key !== id) {
            if (pageNumber > 0) {
              pages.splice(pageNumber)
            } else {
              pages = []
            }
            _addPageTo(pages, id, title)
          }
        } else {
         _addPageTo(pages, id, title)
        }

        _setRefValue(_refDirection, 1)
        return {
          pages,
          pageCurrent: pageNumber + 1
        };
     })
  }), [_hPrevPage, dfProps, store])
  /*eslint-enable react-hooks/exhaustive-deps */
  , _pagesStyle = _crPagesStyle(_refMenu, _refDirection);

  return (
    <div style={S_ROOT}>
      <div
        ref={_refMenu}
        style={_pagesStyle}
      >
        <Frame
          style={S_PAGE}
          title="Main Menu"
          store={store}
          dfProps={dfProps}
          pageCurrent={pageCurrent}
          pageNumber={0}
          onClickNext={_hNextPage}
          loadItems={loadItems}
          fOnClickItem={fOnClickItem}
        />
        <PageList
          pages={pages}
          pageCurrent={pageCurrent}
        />
      </div>
    </div>
  );
}

export default MenuSlider
