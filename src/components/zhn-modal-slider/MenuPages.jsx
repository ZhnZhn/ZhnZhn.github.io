import {
  bindTo,
  safeMap,
  cloneUiElement
} from '../uiApi';

const MenuPages = ({
  isShow,
  style,
  pages,
  pageCurrent,
  onNextPage,
  onPrevPage,
  onClose
}) => safeMap(pages, (Page, index) => {
  const _pageNumber = index + 1
  , _isFirstPage = index === 0;
  return cloneUiElement(Page, {
    style,
    isVisible: isShow && (_pageNumber === pageCurrent),
    pageNumber: _pageNumber,
    onNextPage: _isFirstPage
      ? onNextPage
      : void 0,
    onPrevPage: _isFirstPage
      ? void 0
      : bindTo(onPrevPage, _pageNumber),
    onClose
  });
});

export default MenuPages
