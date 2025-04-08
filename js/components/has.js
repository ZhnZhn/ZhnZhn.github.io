"use strict";

exports.__esModule = true;
exports.isWideWidth = exports.initWidthStyle = exports.getWindowInnerWidth = exports.HAS_WIDE_SCREEN = exports.HAS_TOUCH_EVENTS = exports.HAS_KEYBOARD_FOCUS = void 0;
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
const HAS_TOUCH_EVENTS = exports.HAS_TOUCH_EVENTS = document && 'ontouchstart' in document.documentElement;
const HAS_WIDE_SCREEN = exports.HAS_WIDE_SCREEN = isWideWidth();
const HAS_KEYBOARD_FOCUS = exports.HAS_KEYBOARD_FOCUS = !HAS_TOUCH_EVENTS || HAS_WIDE_SCREEN;
const DF_SCROLL_WIDTH = 16;
const _getWidth = initialWidth => (getWindowInnerWidth() || initialWidth + DF_SCROLL_WIDTH) - DF_SCROLL_WIDTH;
const initWidthStyle = (initialWidth, minWidth) => {
  if (isWideWidth()) {
    return {
      width: initialWidth
    };
  }
  const _width = _getWidth(initialWidth);
  return {
    width: _width > minWidth ? _width : minWidth
  };
};
exports.initWidthStyle = initWidthStyle;
//# sourceMappingURL=has.js.map