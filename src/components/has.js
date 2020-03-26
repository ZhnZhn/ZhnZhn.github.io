
const INITIAL_WIDTH = 635
, _isInnerWidth = () => window && window.innerWidth
, _strWidth = window && window
    .getComputedStyle(document.body, ':after')
    .getPropertyValue('content');

const has = {
  strWidth: _strWidth,
  wideWidth: () => _isInnerWidth()
    ? window.innerWidth > 700
    : true,
  getWidth: (initialWidth=INITIAL_WIDTH) => _isInnerWidth()
    ? window.innerWidth - 16
    : initialWidth,
  initWidthStyle: (initialWidth=INITIAL_WIDTH, minWidth=0) => {
    if (has.wideWidth()) {
      return { width: initialWidth };
    }
    const width = has.getWidth(initialWidth);
    return width > minWidth
      ? { width }
      : { width: minWidth };
  }
};

export default has
