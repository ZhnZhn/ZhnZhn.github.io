import {
  isBool
} from '../../utils/isTypeFn';

import {
  isFn,
  safeMap,
  bindTo
} from '../uiApi';

import {
  S_INLINE,
  crAbsoluteTopLeftStyle
} from '../styleFn';

import InputSwitch from '../zhn/InputSwitch';
import MenuAriaItem from './MenuAriaItem';

const SUB_MENU = 'sub'
, S_ITEM = {
  position: 'relative'
}
, S_INPUT_SWITCH = {
  lineHeight: 'initial',
  height: 35,
  paddingTop: 9
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
     return isBool(isInitial)
         ? <InputSwitch
              key={name}
              refEl={getRefFocus(index)}
              className={cn || itemCl}
              style={S_INPUT_SWITCH}
              initialValue={isInitial}
              caption={name}
              onToggle={_onClick}
           />
         : (<MenuAriaItem
              key={name}
              refEl={getRefFocus(index)}
              className={cn || itemCl}
              style={S_ITEM}
              onClick={_onClick}
          >
            <span>{name}</span>
            <NextPageArrow type={type}/>
          </MenuAriaItem>);
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
