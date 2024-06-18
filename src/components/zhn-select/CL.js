export { CL_NOT_SELECTED } from '../styleFn';

import {
  CL_TEXT_ELLIPSIS,
  CL_WIDTH_100_PERCENT,
  crCn,
  crBtCircleHfCn
} from '../styleFn';

export const CL_ITEM_OPTION = crCn(
  CL_TEXT_ELLIPSIS,
  CL_WIDTH_100_PERCENT
);

const ROOT = 'zhn-select'
, INPUT = ROOT + '__input'
, SPINNER = ROOT + '__spinner'
, OPTIONS = ROOT + '__options'
, OPTIONS_ROW = ROOT + '__row'
, FOOTER = ROOT + '__footer';

export const CL_ROOT = ROOT
export const CL_INPUT = INPUT
export const CL_SPINNER = SPINNER
export const CL_SPINNER_FAILED = SPINNER + '--failed'
export const CL_BT_ARROW = ROOT + '__bt-arrow'

export const CL_OPTIONS = OPTIONS
export const CL_OPTIONS_DIV = OPTIONS + '__div'

export const CL_OPTIONS_ROW = OPTIONS_ROW
export const CL_OPTIONS_ROW_ACTIVE = OPTIONS_ROW + '--active'

export const CL_FOOTER = FOOTER
export const CL_FOOTER_INDEX = FOOTER + '__index'
export const CL_FOOTER_BTS = FOOTER + '__bts'
export const CL_FOOTER_BT = crBtCircleHfCn(FOOTER + '__bt')
