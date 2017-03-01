"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});


var createHandlerDnDList = function createHandlerDnDList(DRAG, WatchActions) {
  return {
    _handlerDragStartList: function _handlerDragStartList(_ref, ev) {
      var groupCaption = _ref.groupCaption,
          caption = _ref.caption;

      this.dragStartWithDnDStyle(ev, [DRAG.GROUP, DRAG.LIST]);
      ev.dataTransfer.effectAllowed = "move";
      ev.dataTransfer.dropEffect = "move";
      var _data = {
        dragId: groupCaption + ";" + caption,
        xType: DRAG.LIST
      };
      ev.dataTransfer.setData("text", JSON.stringify(_data));
    },
    _handlerDropList: function _handlerDropList(_ref2, ev) {
      var groupCaption = _ref2.groupCaption,
          caption = _ref2.caption;

      this.dropWithDnDStyle(ev);
      //ev.currentTarget.style.borderLeft = "";

      var data = JSON.parse(ev.dataTransfer.getData("text")),
          xType = data.xType,
          dragId = data.dragId,
          dropId = groupCaption + ";" + caption + ";";


      if (xType === DRAG.LIST) {
        if (dragId !== dropId) {
          ev.preventDefault();
          WatchActions.dragDropList({
            dragId: dragId,
            dropId: dropId
          });
        } else {
          return undefined;
        }
      } else if (xType === DRAG.ITEM) {
        ev.preventDefault();
        WatchActions.dragDropItem({
          dragId: dragId,
          dropId: dropId
        });
      }
    },
    _handlerDragEnterList: function _handlerDragEnterList(ev) {
      ev.preventDefault();
      this.dragEnterWithDnDStyle(ev, DRAG.LIST);
    },
    _handlerDragOverList: function _handlerDragOverList(ev) {
      ev.preventDefault();
    },
    _handlerDragLeaveList: function _handlerDragLeaveList(ev) {
      ev.preventDefault();
      this.dragLeaveWithDnDStyle(ev);
    }
  };
};

exports.default = createHandlerDnDList;
//# sourceMappingURL=createHandlerDnDList.js.map