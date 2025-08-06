import { isBool } from '../../utils/isTypeFn';

import {
  safeMap,
  bindTo,
  fOnClick
} from '../uiApi';
import { crMenuItemRole } from '../a11yFn';

import {
  S_INLINE,
  crAbsoluteTopLeftStyle
} from '../styleFn';

import InputSwitch from '../zhn/InputSwitch';

const SUB_MENU = 'sub'
, S_ITEM = {
  position: 'relative'
}
, S_INPUT_SWITCH = {
  height: 35,
  paddingTop: 9
}
, S_NEXT_PAGE = {
  ...S_INLINE,
  ...crAbsoluteTopLeftStyle(0, 4, !0),
  color: 'inherit',
  padding: '1px 16px 1px 0',
  fontWeight: 'bold'
};

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
        : fOnClick(onClick, onClose, isClose);
     return isBool(isInitial)
       ? (<div
           key={name}
           {...crMenuItemRole()}
         >
           <InputSwitch
             refEl={getRefFocus(index)}
             className={cn || itemCl}
             style={S_INPUT_SWITCH}
             initialValue={isInitial}
             caption={name}
             onToggle={_onClick}
           />
         </div>)
       : (<div
            key={name}
            ref={getRefFocus(index)}
            className={cn || itemCl}
            style={S_ITEM}
            {...crMenuItemRole(_onClick, "0")}
          >
            <span>{name}</span>
            <NextPageArrow type={type}/>
          </div>);
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
