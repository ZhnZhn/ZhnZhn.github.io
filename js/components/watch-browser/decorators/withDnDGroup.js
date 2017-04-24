"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _crDragStartGroup = function _crDragStartGroup(DRAG) {
  return function (_ref, ev) {
    var caption = _ref.caption;

    this.dragStartWithDnDStyle(ev, [DRAG.GROUP]);
    ev.dataTransfer.effectAllowed = "move";
    ev.dataTransfer.dropEffect = "move";
    var _data = {
      dragId: caption + ";",
      xType: DRAG.GROUP
    };
    ev.dataTransfer.setData("text", JSON.stringify(_data));
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
    var _proto = target.prototype;
    _proto._handlerDragStartGroup = _crDragStartGroup(DRAG);
    _proto._handlerDropGroup = _crDropGroup(DRAG, WatchActions);
    _proto._handlerDragEnterGroup = _crDragEnterGroup(DRAG);
    _proto._handlerDragOverGroup = _handlerDragOverGroup;
    _proto._handlerDragLeaveGroup = _handlerDragLeaveGroup;
  };
};

exports.default = withDnDGroup;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\watch-browser\decorators\withDnDGroup.js.map