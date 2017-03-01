"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var createHandlerDnDItem = function createHandlerDnDItem(DRAG, WatchActions) {
  return {
    _handlerDragStartItem: function _handlerDragStartItem(_ref, ev) {
      var groupCaption = _ref.groupCaption,
          listCaption = _ref.listCaption,
          caption = _ref.caption;

      this.dragStartWithDnDStyle(ev, [DRAG.LIST, DRAG.ITEM]);
      ev.dataTransfer.effectAllowed = "move";
      ev.dataTransfer.dropEffect = "move";
      //.setDragImage(img, 0, 0);
      var _data = {
        dragId: groupCaption + ";" + listCaption + ";" + caption,
        xType: DRAG.ITEM
      };
      ev.dataTransfer.setData("text", JSON.stringify(_data));
    },
    _handlerDropItem: function _handlerDropItem(_ref2, ev) {
      var groupCaption = _ref2.groupCaption,
          listCaption = _ref2.listCaption,
          caption = _ref2.caption;

      this.dropWithDnDStyle(ev);
      var data = JSON.parse(ev.dataTransfer.getData("text")),
          xType = data.xType,
          dragId = data.dragId,
          dropId = groupCaption + ";" + listCaption + ";" + caption;


      if (xType === DRAG.ITEM) {
        if (dragId !== dropId) {
          ev.preventDefault();
          WatchActions.dragDropItem({
            dragId: dragId,
            dropId: dropId
          });
        } else {
          return undefined;
        }
      }
    },
    _handlerDragEnterItem: function _handlerDragEnterItem(ev) {
      ev.preventDefault();
      this.dragEnterWithDnDStyle(ev, DRAG.ITEM);
    },
    _handlerDragOverItem: function _handlerDragOverItem(ev) {
      ev.preventDefault();
    },
    _handlerDragLeaveItem: function _handlerDragLeaveItem(ev) {
      ev.preventDefault();
      this.dragLeaveWithDnDStyle(ev);
    }
  };
};

exports.default = createHandlerDnDItem;
//# sourceMappingURL=createHandlerDnDItem.js.map