import {
  CL_NOT_SELECTED,
  CL_TEXT_ELLIPSIS,
  CL_WIDTH_100_PERCENT,
  crCn,
  crNotSelectedCn
} from '../styleFn';

export const CL_ROOT = 'zhn-select'
export const CL_INPUT = CL_ROOT + '__input'
export const CL_BT_ARROW = CL_ROOT + '__bt-arrow'
export const CL_SPINNER = CL_ROOT + '__spinner'
export const CL_SPINNER_FAILED = CL_SPINNER + '--failed'
export const CL_OPTIONS = CL_ROOT + '__options'
export const CL_OPTIONS_DIV = CL_OPTIONS + '__div'
export const CL_OPTIONS_ROW = CL_ROOT + '__row'
export const CL_OPTIONS_ROW_ACTIVE = CL_OPTIONS_ROW + '--active'

export const CL_ITEM_OPTION = crCn(
  CL_TEXT_ELLIPSIS,
  CL_WIDTH_100_PERCENT
)

const FOOTER = CL_ROOT + '__footer';
export const CL_FOOTER = crNotSelectedCn(FOOTER)
export const CL_FOOTER_INDEX = FOOTER + '__index'
export const CL_FOOTER_BTS = FOOTER + '__bts'

export const COLOR_OPTIONS_OPEN = '#1b75bb'
export const COLOR_OPTIONS_CLOSE = '#858585'
