export const HAS_TOUCH_EVENTS = document
    && 'ontouchstart' in document.documentElement;

export const getWindowInnerWidth = () => window
  && window.innerWidth

const DF_WIDE_WIDTH = 700;
export const isWideWidth = (
  wideWidth=DF_WIDE_WIDTH
) => (getWindowInnerWidth() || wideWidth+1) > wideWidth

const DF_SCROLL_WIDTH = 16;
const _getWidth = (
  initialWidth
) => (getWindowInnerWidth() || initialWidth+DF_SCROLL_WIDTH) - DF_SCROLL_WIDTH;

export const initWidthStyle = (
  initialWidth,
  minWidth
) => {
  if (isWideWidth()) {
    return { width: initialWidth };
  }
  const width = _getWidth(initialWidth);
  return {
    width:  width > minWidth ? width : minWidth
  };
}
