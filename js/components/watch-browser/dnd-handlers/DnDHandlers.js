"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.hDragOver = exports.hDragLeave = exports.fDragStart = exports.fDragEnter = void 0;

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
//# sourceMappingURL=DnDHandlers.js.map