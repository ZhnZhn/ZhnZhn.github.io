import {
  CL_BLACK,
  crAbsoluteTopLeftStyle
} from '../styleFn';

export const CL_MENU_ITEM = "menu-item";

export const S_FRAME = {
  fontWeight: 'bold',
  fontSize: '16px'
}

export const S_MSG_ERR = {
  color: '#f44336',
  paddingLeft: 12
}

export const S_TITLE = {
  position: 'relative',
  color: "#607d8b",
  padding: '8px 0 4px 32px',
  cursor: 'pointer'
}

export const S_TITLE_ARROW = crAbsoluteTopLeftStyle(8, 16)

const _CL_MENU_ITEM_BLACK = `${CL_MENU_ITEM} ${CL_BLACK}`
, _S_ITEM_T = {
  padding: 8,
  cursor: 'pointer'
}
, _S_ITEM_L = {
  ..._S_ITEM_T,
  paddingLeft: 12,
};

export const getMenuItemStyle = (
  type
) => type === 'l'
  ? [CL_MENU_ITEM, _S_ITEM_L]
  : [_CL_MENU_ITEM_BLACK, _S_ITEM_T]
