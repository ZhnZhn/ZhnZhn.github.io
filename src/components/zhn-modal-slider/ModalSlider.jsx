import {
  useState,
  useCallback
} from 'react';
import useDidUpdate from '../hooks/useDidUpdate';

import throttleFn from '../../utils/throttleFn';

import ModalPane from '../zhn-moleculs/ModalPane';
import ShowHide from '../zhn/ShowHide';

import MenuPage from './MenuPage';
import MenuPages from './MenuPages';

const S_SHOW_HIDE = {
  position: 'absolute',
  overflow: 'hidden'
}
, S_PAGES = {
  display: 'flex',
  flexFlow: 'row nowrap',
  alignItems: 'flex-start',
  overflowX: 'hidden',
  transition: 'all 750ms ease-out'
}

, DF_INIT_ID = 'p0'
, DF_MODEL = {
  pageWidth: 100,
  maxPages: 2,
  initId: DF_INIT_ID,
  p0: []
};

const _initState = model => {
  const _pW = model.pageWidth
  , _maxP = model.maxPages
  , _initId = model.initId || DF_INIT_ID;

  return {
    pageWidth: _pW,
    pagesStyle: {
      width: `${_maxP*_pW}px`
    },
    pageStyle: {
      width: `${_pW}px`
    },
    pageCurrent: 1,
    pages: [
      <MenuPage
        key={_initId}
        items={model[_initId]}
        titleCl={model.titleCl}
        itemCl={model.itemCl}
      />
    ]
  };
};

const _addPage = (
  pages,
  id,
  title,
  model
) => {
  pages.push((
    <MenuPage
      key={id}
      title={title}
      items={model[id]}
      titleCl={model.titleCl}
      itemCl={model.itemCl}
    />
  ))
};

const _crTransform = (
  pageWidth,
  pageCurrent
) => {
  const _dX = -1*pageWidth*(pageCurrent - 1)+0;
  return {
    transform: `translateX(${_dX}px)`
  };
};

const ModalSlider = ({
  model=DF_MODEL,
  isShow,
  className,
  rootStyle,
  style,
  onClose
}) => {
  const [
    state,
    setState
  ] = useState(() => _initState(model))
  , {
     pageWidth,
     pagesStyle,
     pageStyle,
     pageCurrent,
     pages
   } = state
   /*eslint-disable react-hooks/exhaustive-deps */
  , hPrevPage = useCallback(throttleFn((pageNumber) => {
     setState(prevState => {
       prevState.pageCurrent = pageNumber - 1
       return {...prevState};
     })
  }), [])

  , hNextPage = useCallback(throttleFn((id, title, pageNumber)=>{
     setState(prevState => {
       const { pages } = prevState
       , _max = pages.length-1;

       if ( (_max+1) > pageNumber) {
         if (pages[pageNumber] && pages[pageNumber].key !== id) {
           if (pageNumber>0) {
             prevState.pages.splice(pageNumber)
           } else {
             prevState.pages = []
           }
           _addPage(prevState.pages, id, title, model)
         }
       } else {
         _addPage(pages, id, title, model)
       }

       prevState.pageCurrent = pageNumber + 1
       return {...prevState};
     })
  }), [model])
  /*eslint-enable react-hooks/exhaustive-deps */

  useDidUpdate(
    () => setState(_initState(model)),
    [model]
  )

  const _showHideStyle = {
    ...style,
    ...S_SHOW_HIDE,
    ...pageStyle
  }, _divStyle = {
    ...S_PAGES,
    ...pagesStyle,
    ..._crTransform(pageWidth, pageCurrent)
  };

  return (
      <ModalPane
        isShow={isShow}
        style={rootStyle}
        onClose={onClose}
      >
        <ShowHide
          className={className}
          style={_showHideStyle}
          isShow={isShow}
        >
          <div style={_divStyle}>
            <MenuPages
              isShow={isShow}
              style={pageStyle}
              pages={pages}
              pageCurrent={pageCurrent}
              onNextPage={hNextPage}
              onPrevPage={hPrevPage}
              onClose={onClose}
            />
          </div>
        </ShowHide>
      </ModalPane>
  );
};

export default ModalSlider
