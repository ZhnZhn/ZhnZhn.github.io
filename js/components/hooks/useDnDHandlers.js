"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
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
    onDragStart: (0, _uiApi.bindTo)(onDragStart, option),
    onDrop: (0, _uiApi.bindTo)(onDrop, option),
    onDragEnter,
    onDragOver,
    onDragLeave
  } : void 0;
};
var _default = useDnDHandlers;
exports.default = _default;
//# sourceMappingURL=useDnDHandlers.js.map