"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.hDragOver = exports.hDragLeave = exports.fDragStart = exports.fDragEnter = exports.crDnDHandlers = void 0;
var _uiApi = require("../../uiApi");
var _setTransferTo = _interopRequireDefault(require("./setTransferTo"));
var _DnDStyleHandlers = require("./DnDStyleHandlers");
const fDragStart = (permissions, crDragId) => (options, event) => {
  (0, _DnDStyleHandlers.dragStartWithDnDStyle)(event, permissions);
  (0, _setTransferTo.default)({
    event,
    dragId: crDragId(options),
    xType: permissions[0]
  });
};
exports.fDragStart = fDragStart;
const fDragEnter = (sourceType, borderColor) => event => {
  event.preventDefault();
  (0, _DnDStyleHandlers.dragEnterWithDnDStyle)(event, sourceType, borderColor);
};
exports.fDragEnter = fDragEnter;
const hDragOver = event => {
  event.preventDefault();
};
exports.hDragOver = hDragOver;
const hDragLeave = ev => {
  ev.preventDefault();
  (0, _DnDStyleHandlers.dragLeaveWithDnDStyle)(ev);
};
exports.hDragLeave = hDragLeave;
const crDnDHandlers = (onDragStart, onDrop, onDragEnter, onDragOver, onDragLeave, isEditMode, option) => isEditMode ? {
  draggable: true,
  onDragStart: (0, _uiApi.bindTo)(onDragStart, option),
  onDrop: (0, _uiApi.bindTo)(onDrop, option),
  onDragEnter,
  onDragOver,
  onDragLeave
} : void 0;
exports.crDnDHandlers = crDnDHandlers;
//# sourceMappingURL=DnDHandlers.js.map