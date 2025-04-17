import { bindTo } from '../uiApi';
import {
  CL_POPUP_MENU,
  crCn,
  crSliderTransformStyle
} from '../styleFn';

import memoIsShow from '../hoc/memoIsShow';

import useInitStateFromProps from '../hooks/useInitStateFromProps';
import useThrottleCallback from '../hooks/useThrottleCallback';

import ModalPane from '../zhn-moleculs/ModalPane';
import ShowHide from '../zhn/ShowHide';

import MenuPage from './MenuPage';
import MenuPages from './MenuPages';

const CL_SLIDER_PAGES = 'slider-pages'
, S_SHOW_HIDE = {
  position: 'absolute',
  overflow: 'hidden'
}
, DF_INIT_ID = 'p0'
, DF_MODEL = {
  pageWidth: 100,
  maxPages: 2,
  initId: DF_INIT_ID,
  p0: []
};

const _crWidthStyle = (v) => ({
  width: v
})

const _addPage = (
  model,
  pages,
  id,
  title
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

const _initState = model => {
  const _pW = model.pageWidth
  , _initId = model.initId || DF_INIT_ID;

  return {
    addPage: bindTo(_addPage, model),
    pageWidth: _pW,
    pageStyle: _crWidthStyle(_pW),
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

export const ModalSlider = ({
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
  ] = useInitStateFromProps(
    _initState,
    model
  )
  , {
     pageWidth,
     pageStyle,
     pageCurrent,
     pages
   } = state
  , hPrevPage = useThrottleCallback(pageNumber => {
     setState(prevState => {
       prevState.pageCurrent = pageNumber - 1
       return {...prevState};
     })
  })
  , hNextPage = useThrottleCallback((
      id,
      title,
      pageNumber
    ) => {
     setState(prevState => {
       const {
         addPage,
         pages
       } = prevState
       , _max = pages.length-1;

       if ((_max+1) > pageNumber) {
         if (pages[pageNumber] && pages[pageNumber].key !== id) {
           if (pageNumber>0) {
             prevState.pages.splice(pageNumber)
           } else {
             prevState.pages = []
           }
           addPage(prevState.pages, id, title)
         }
       } else {
         addPage(pages, id, title)
       }

       prevState.pageCurrent = pageNumber + 1
       return {...prevState};
     })
  });

  const _showHideStyle = {
    ...style,
    ...S_SHOW_HIDE,
    ...pageStyle
  }
  , _divStyle = crSliderTransformStyle(
     pageWidth,
     pageCurrent
  );
  return (
      <ModalPane
        isShow={isShow}
        style={rootStyle}
        onClose={onClose}
      >
        <ShowHide
          className={crCn(CL_POPUP_MENU, className)}
          style={_showHideStyle}
          isShow={isShow}
        >
          <div className={CL_SLIDER_PAGES} style={_divStyle}>
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
}

export const ModalSliderMemoIsShow = memoIsShow(ModalSlider)
