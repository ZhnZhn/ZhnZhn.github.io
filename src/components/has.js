export const getWindowInnerWidth = () => window
  && window.innerWidth

const DF_WIDE_WIDTH = 700;
export const isWideWidth = (
  wideWidth=DF_WIDE_WIDTH
) => (getWindowInnerWidth() || wideWidth+1) > wideWidth

export const HAS_TOUCH_EVENTS = document
    && 'ontouchstart' in document.documentElement;

const HAS_WIDE_SCREEN = isWideWidth();
export const HAS_KEYBOARD_FOCUS = !HAS_TOUCH_EVENTS
  || HAS_WIDE_SCREEN

const DF_SCROLL_WIDTH = 16;
const _getWidth = (
  initialWidth
) => (getWindowInnerWidth() || (initialWidth + DF_SCROLL_WIDTH)) - DF_SCROLL_WIDTH;

export const initWidthStyle = (
  initialWidth,
  minWidth
) => {
  if (isWideWidth()) {
    return { width: initialWidth };
  }
  const _width = _getWidth(initialWidth);
  return {
    width: _width > minWidth
      ? _width
      : minWidth
  };
}
