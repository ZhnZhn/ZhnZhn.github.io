import { getColorBlack } from '../styleFn';

export const CL_MENU_ITEM = 'menu-item';

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
  color: 'silver',
  padding: '8px 0 4px 32px',
  cursor: 'pointer'
}

export const S_TITLE_ARROW = {
  position: 'absolute',
  top: 8,
  left: 16
}

const _S_ITEM = {
  padding: 8,
  cursor: 'pointer'
}

export const S_ITEM_L = {
  ..._S_ITEM,
  paddingLeft: 12,
}

export const crItemTStyle = () => ({
  ..._S_ITEM,
  color: getColorBlack()
})
