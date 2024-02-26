export {
  CL_SHOW_POPUP,
  CL_NOT_SELECTED,
  S_BLOCK,
  S_NONE,
  CL_OPEN_CLOSE,
  CL_OPEN_CLOSE_EXP
} from '../styleFn';

import { TRANSPARENT_COLOR } from '../styles/Color';

export const S_SVG = {
  display: 'inline-block',
  position: 'relative',
  top: 1,
  marginLeft: 8
}
export const S_CAPTION = {
  paddingLeft: 4,
  fontWeight: 'bold',
  fontSize: '16px',
  cursor: 'pointer'
}

export const FILL_CLOSE_COLOR = TRANSPARENT_COLOR

export const PATH_OPEN = "M 2,14 L 14,14 14,2 2,14"
export const PATH_CLOSE = "M 2,2 L 14,8 2,14 2,2"
