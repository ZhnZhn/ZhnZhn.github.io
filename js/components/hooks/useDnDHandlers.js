"use strict";

exports.__esModule = true;
exports.default = void 0;

const useDnDHandlers = _ref => {
  let {
    isDraggable,
    option,
    onDragStart,
    onDrop,
    onDragEnter,
    onDragOver,
    onDragLeave
  } = _ref;
  return isDraggable ? {
    draggable: true,
    onDragStart: onDragStart.bind(null, option),
    onDrop: onDrop.bind(null, option),
    onDragEnter,
    onDragOver,
    onDragLeave
  } : void 0;
};

var _default = useDnDHandlers;
exports.default = _default;
//# sourceMappingURL=useDnDHandlers.js.map