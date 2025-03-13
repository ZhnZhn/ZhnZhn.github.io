import { useState } from '../uiApi';
import { crSliderTransformStyle } from '../styleFn';

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
  transition: 'all .3s ease-out'
}
, S_PAGE = { width: PAGE_WIDTH };

const MenuSlider = ({
  dfProps,
  getProxy
}) => {
  const [{
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
           : {
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
        return {
          pages,
          pageCurrent: pageNumber + 1
        };
     })
  }, [_hPrevPage])
  , _pagesStyle = {
    ...S_PAGES,
    ...crSliderTransformStyle(PAGE_WIDTH, pageCurrent + 1)
  };

  return (
    <div style={S_ROOT}>
      <div style={_pagesStyle}>
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
