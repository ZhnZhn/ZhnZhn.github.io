import { isTokenInStr } from '../uiApi';

export const NO_RESULT = 'noresult'

export const crWidthStyle = (
  width,
  style
) => width
  ? {
      ...style,
      width: width + (isTokenInStr(''+width, '%') ? '' : 'px')
    }
  : null;
