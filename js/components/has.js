"use strict";

exports.__esModule = true;
exports.isWideWidth = exports.initWidthStyle = exports.getWindowInnerWidth = exports.HAS_TOUCH_EVENTS = void 0;
const HAS_TOUCH_EVENTS = document && 'ontouchstart' in document.documentElement;
exports.HAS_TOUCH_EVENTS = HAS_TOUCH_EVENTS;
const getWindowInnerWidth = () => window && window.innerWidth;
exports.getWindowInnerWidth = getWindowInnerWidth;
const DF_WIDE_WIDTH = 700;
const isWideWidth = function (wideWidth) {
  if (wideWidth === void 0) {
    wideWidth = DF_WIDE_WIDTH;
  }
  return (getWindowInnerWidth() || wideWidth + 1) > wideWidth;
};
exports.isWideWidth = isWideWidth;
const DF_SCROLL_WIDTH = 16;
const _getWidth = initialWidth => (getWindowInnerWidth() || initialWidth + DF_SCROLL_WIDTH) - DF_SCROLL_WIDTH;
const initWidthStyle = (initialWidth, minWidth) => {
  if (isWideWidth()) {
    return {
      width: initialWidth
    };
  }
  const width = _getWidth(initialWidth);
  return {
    width: width > minWidth ? width : minWidth
  };
};
exports.initWidthStyle = initWidthStyle;
//# sourceMappingURL=has.js.map