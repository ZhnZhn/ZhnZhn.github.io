const _INITIAL_WIDTH = 635
, _hasInnerWidth = window && window.innerWidth;

export const STR_WIDTH = window && window
    .getComputedStyle(document.body, ':after')
    .getPropertyValue('content')

export const HAS_WIDE_WIDTH = STR_WIDTH.indexOf('W') === -1

export const HAS_TOUCH_EVENTS = document
    && 'ontouchstart' in document.documentElement;

export const isWideWidth = () => _hasInnerWidth
  ? window.innerWidth > 700
  : true

const _getWidth = (
  initialWidth=_INITIAL_WIDTH
) => _hasInnerWidth
  ? window.innerWidth - 16
  : initialWidth

export const initWidthStyle = (
  initialWidth=_INITIAL_WIDTH,
  minWidth=0
) => {
  if (isWideWidth()) {
    return { width: initialWidth };
  }
  const width = _getWidth(initialWidth);
  return width > minWidth
    ? { width }
    : { width: minWidth };
}
