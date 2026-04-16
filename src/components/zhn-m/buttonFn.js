import { joinByBlank } from '../../utils/arrFn';

export const crButtonTitle = (
  title,
  hotKey
) => hotKey
  ? joinByBlank(title, `[${hotKey.toLowerCase()}]`)
  : title || void 0
