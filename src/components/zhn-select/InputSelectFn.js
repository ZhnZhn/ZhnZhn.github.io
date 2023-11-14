import { isTokenInStr } from '../uiApi';

export const crWidthStyle = (
  width,
  style
) => width
  ? {
      ...style,
      width: width + (isTokenInStr(''+width, '%') ? '' : 'px')
    }
  : null;
