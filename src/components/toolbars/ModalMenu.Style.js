import {
  S_BOX_SHADOW,
  crAbsoluteTopLeftStyle
} from '../styleFn';

export const S_MODAL_MENU = {
  ...S_BOX_SHADOW,
  ...crAbsoluteTopLeftStyle(30, -5),
  zIndex: 1010,
  backgroundColor: 'inherit',
  stroke: 'inherit'  
}
