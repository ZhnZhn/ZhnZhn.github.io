"use strict";

exports.__esModule = true;
exports.isWideWidth = exports.initWidthStyle = exports.STR_WIDTH = exports.HAS_WIDE_WIDTH = exports.HAS_TOUCH_EVENTS = void 0;
const _INITIAL_WIDTH = 635,
  _hasInnerWidth = window && window.innerWidth;
const STR_WIDTH = window && window.getComputedStyle(document.body, ':after').getPropertyValue('content');
exports.STR_WIDTH = STR_WIDTH;
const HAS_WIDE_WIDTH = STR_WIDTH.indexOf('W') === -1;
exports.HAS_WIDE_WIDTH = HAS_WIDE_WIDTH;
const HAS_TOUCH_EVENTS = document && 'ontouchstart' in document.documentElement;
exports.HAS_TOUCH_EVENTS = HAS_TOUCH_EVENTS;
const isWideWidth = () => _hasInnerWidth ? window.innerWidth > 700 : true;
exports.isWideWidth = isWideWidth;
const _getWidth = function (initialWidth) {
  if (initialWidth === void 0) {
    initialWidth = _INITIAL_WIDTH;
  }
  return _hasInnerWidth ? window.innerWidth - 16 : initialWidth;
};
const initWidthStyle = function (initialWidth, minWidth) {
  if (initialWidth === void 0) {
    initialWidth = _INITIAL_WIDTH;
  }
  if (minWidth === void 0) {
    minWidth = 0;
  }
  if (isWideWidth()) {
    return {
      width: initialWidth
    };
  }
  const width = _getWidth(initialWidth);
  return width > minWidth ? {
    width
  } : {
    width: minWidth
  };
};
exports.initWidthStyle = initWidthStyle;
//# sourceMappingURL=has.js.map