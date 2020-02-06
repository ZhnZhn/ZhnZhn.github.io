"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _fnDnD = _interopRequireDefault(require("./fnDnD"));

var _crDragStartItem = function _crDragStartItem(DRAG) {
  return function (_ref, ev) {
    var groupCaption = _ref.groupCaption,
        listCaption = _ref.listCaption,
        caption = _ref.caption;
    this.dragStartWithDnDStyle(ev, [DRAG.LIST, DRAG.ITEM]);

    _fnDnD["default"].setTransferTo({
      event: ev,
      dragId: groupCaption + ";" + listCaption + ";" + caption,
      xType: DRAG.ITEM
    });
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
    this.dragEnterWithDnDStyle(ev, DRAG.ITEM, DRAG.C_LIST_ENTER);
  };
};

var _hDragOverItem = function _hDragOverItem(ev) {
  ev.preventDefault();
};

var _hDragLeaveItem = function _hDragLeaveItem(ev) {
  ev.preventDefault();
  this.dragLeaveWithDnDStyle(ev);
};

var _bindDnDItem = function _bindDnDItem(DRAG, WatchActions) {
  Object.assign(this, {
    _hDragStartItem: _crDragStartItem(DRAG).bind(this),
    _hDropItem: _crDropItem(DRAG, WatchActions).bind(this),
    _hDragEnterItem: _crDragEnterItem(DRAG).bind(this),
    _hDragOverItem: _hDragOverItem,
    _hDragLeaveItem: _hDragLeaveItem.bind(this)
  });
};

var withDnDItem = function withDnDItem(target) {
  Object.assign(target.prototype, {
    _bindDnDItem: _bindDnDItem
  });
};

var _default = withDnDItem;
exports["default"] = _default;
//# sourceMappingURL=withDnDItem.js.map