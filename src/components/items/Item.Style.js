import { HAS_WIDE_SCREEN } from '../has';
import { crNotSelectedCn } from '../styleFn';

export const CL_VM_BADGE_BT = HAS_WIDE_SCREEN
  ? "bt-sl-18"
  : "bt"
export const CL_HEADER_CAPTION = crNotSelectedCn("text-clip bt-left bt black")

export const COLOR_SVG_MORE = "#777"
export const S_BT_SVG_CLOSE = {
  stroke: COLOR_SVG_MORE
}
