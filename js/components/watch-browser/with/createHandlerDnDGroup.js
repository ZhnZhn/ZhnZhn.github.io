"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var createHandlerDnDGroup = function createHandlerDnDGroup(DRAG, WatchActions) {
  return {
    _handlerDragStartGroup: function _handlerDragStartGroup(_ref, ev) {
      var caption = _ref.caption;

      this.dragStartWithDnDStyle(ev, [DRAG.GROUP]);
      ev.dataTransfer.effectAllowed = "move";
      ev.dataTransfer.dropEffect = "move";
      var _data = {
        dragId: caption + ";",
        xType: DRAG.GROUP
      };
      ev.dataTransfer.setData("text", JSON.stringify(_data));
    },
    _handlerDropGroup: function _handlerDropGroup(_ref2, ev) {
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
    },
    _handlerDragEnterGroup: function _handlerDragEnterGroup(ev) {
      ev.preventDefault();
      this.dragEnterWithDnDStyle(ev, DRAG.GROUP);
    },
    _handlerDragOverGroup: function _handlerDragOverGroup(ev) {
      ev.preventDefault();
    },
    _handlerDragLeaveGroup: function _handlerDragLeaveGroup(ev) {
      ev.preventDefault();
      this.dragLeaveWithDnDStyle(ev);
    }
  };
};

exports.default = createHandlerDnDGroup;
//# sourceMappingURL=createHandlerDnDGroup.js.map