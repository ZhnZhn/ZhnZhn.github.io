import {
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
}) => safeMap(pages, (Page, index) => cloneUiElement(Page, {
  style,
  isVisible: isShow && (index + 1 === pageCurrent),
  pageNumber: index + 1,
  onNextPage: index === 0 ? onNextPage : void 0,
  onPrevPage: index !== 0 ? onPrevPage : void 0,
  onClose
}));

export default MenuPages
