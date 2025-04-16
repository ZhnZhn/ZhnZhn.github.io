import {
  isFn,
  safeMap,
  bindTo
} from '../uiApi';

import {
  S_INLINE,
  crAbsoluteTopLeftStyle
} from '../styleFn';

import SvgCheckIn from '../zhn/SvgCheckIn';
import MenuAriaItem from './MenuAriaItem';

const SUB_MENU = 'sub'
, CL_SP_SVG_CHECKED = 'sp-svg-checked'
, S_ITEM = {
  position: 'relative'
}
, S_NEXT_PAGE = {
  ...S_INLINE,  
  ...crAbsoluteTopLeftStyle(0, 4, !0),
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
       isInitial,
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
         isInitial={isInitial}
         onClick={_onClick}
       >
         {(is) => (
           <>
             <span>{name}</span>
             <SvgCheckIn is={is} cn={CL_SP_SVG_CHECKED} />
             <NextPageArrow type={type} />
           </>
        )}
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
