"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _crDragStartItem = function _crDragStartItem(DRAG) {
  return function (_ref, ev) {
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
  };
};

var _crDropItem = function _crDropItem(DRAG, WatchActions) {
  return function (_ref2, ev) {
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
  };
};

var _crDragEnterItem = function _crDragEnterItem(DRAG) {
  return function (ev) {
    ev.preventDefault();
    this.dragEnterWithDnDStyle(ev, DRAG.ITEM);
  };
};

var _handlerDragOverItem = function _handlerDragOverItem(ev) {
  ev.preventDefault();
};

var _handlerDragLeaveItem = function _handlerDragLeaveItem(ev) {
  ev.preventDefault();
  this.dragLeaveWithDnDStyle(ev);
};

var withDnDItem = function withDnDItem(DRAG, WatchActions) {
  return function (target) {
    var _proto = target.prototype;
    _proto._handlerDragStartItem = _crDragStartItem(DRAG);
    _proto._handlerDropItem = _crDropItem(DRAG, WatchActions);
    _proto._handlerDragEnterItem = _crDragEnterItem(DRAG);
    _proto._handlerDragOverItem = _handlerDragOverItem;
    _proto._handlerDragLeaveItem = _handlerDragLeaveItem;
  };
};

exports.default = withDnDItem;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\watch-browser\decorators\withDnDItem.js.map