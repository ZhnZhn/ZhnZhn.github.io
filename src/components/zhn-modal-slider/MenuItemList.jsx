import { isFn, safeMap, bindTo } from '../uiApi';

import MenuAriaItem from './MenuAriaItem';

const SUB_MENU = 'sub'
, S_ITEM = { position: 'relative' }
, S_NEXT_PAGE = {
  display: 'inline-block',
  position: 'absolute',
  top: 0,
  right: 4,
  color: 'inherit',
  padding: '1px 16px 1px 0px',
  fontWeight: 'bold'
};

const _fClick = ({
  isClose,
  onClick,
  onClose
}) => isFn(onClick)
  ? isClose
      ? () => { onClick(); onClose(); }
      : onClick
  : void 0;

const NextPageArrow = ({
  type
}) => type === SUB_MENU
 ? (<span style={S_NEXT_PAGE}>{">"}</span>)
 : null;

const MenuItemList = ({
  getRefFocus,
  items,
  itemCl,
  pageNumber,
  onNextPage,
  onClose
}) => (
  <>
   {safeMap(items, (item, index) => {
     const {
       cn,
       name,
       type,
       id,
       isClose,
       onClick
     } = item
     , _onClick = type === SUB_MENU
         ? bindTo(onNextPage, id, name, pageNumber)
         : _fClick({ isClose, onClick, onClose });
     return (
       <MenuAriaItem
         key={name}
         refEl={getRefFocus(index)}
         className={cn || itemCl}
         style={S_ITEM}
         onClick={_onClick}
       >
         <span>{name}</span>
         <NextPageArrow type={type} />
       </MenuAriaItem>
     );
    })}
  </>
);

/*
MenuItemList.propTypes = {
  items: PropTypes.array,
  itemCl: PropTypes.string,
  pageNumber: PropTypes.number,
  onNextPage: PropTypes.func,
  onClose: PropTypes.func
}
*/

export default MenuItemList
