"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fnDnD = require("./fnDnD");

var _fnDnD2 = _interopRequireDefault(_fnDnD);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _crDragStartGroup = function _crDragStartGroup(DRAG) {
  return function (_ref, ev) {
    var caption = _ref.caption;

    this.dragStartWithDnDStyle(ev, [DRAG.GROUP]);
    _fnDnD2.default.setTransferTo({
      event: ev,
      dragId: caption + ";",
      xType: DRAG.GROUP
    });
  };
};

var _crDropGroup = function _crDropGroup(DRAG, WatchActions) {
  return function (_ref2, ev) {
    var caption = _ref2.caption;

    this.dropWithDnDStyle(ev);
    var data = JSON.parse(ev.dataTransfer.getData("text")),
        xType = data.xType,
        dragId = data.dragId,
        dropId = caption + ";";


    if (xType === DRAG.GROUP) {
      if (dragId !== dropId) {
        ev.preventDefault();
        WatchActions.dragDropGroup({
          dragId: dragId,
          dropId: dropId
        });
      } else {
        return undefined;
      }
    } else if (xType === DRAG.LIST) {
      ev.preventDefault();
      WatchActions.dragDropList({
        dragId: dragId,
        dropId: dropId
      });
    }
  };
};

var _crDragEnterGroup = function _crDragEnterGroup(DRAG) {
  return function (ev) {
    ev.preventDefault();
    this.dragEnterWithDnDStyle(ev, DRAG.GROUP);
  };
};

var _handlerDragOverGroup = function _handlerDragOverGroup(ev) {
  ev.preventDefault();
};

var _handlerDragLeaveGroup = function _handlerDragLeaveGroup(ev) {
  ev.preventDefault();
  this.dragLeaveWithDnDStyle(ev);
};

var withDnDGroup = function withDnDGroup(DRAG, WatchActions) {
  return function (target) {
    Object.assign(target.prototype, {
      _handlerDragStartGroup: _crDragStartGroup(DRAG),
      _handlerDropGroup: _crDropGroup(DRAG, WatchActions),
      _handlerDragEnterGroup: _crDragEnterGroup(DRAG),
      _handlerDragOverGroup: _handlerDragOverGroup,
      _handlerDragLeaveGroup: _handlerDragLeaveGroup
    });
  };
};

exports.default = withDnDGroup;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\watch-browser\decorators\withDnDGroup.js.map