"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _fnDnD = _interopRequireDefault(require("./fnDnD"));

var _crDragStartList = function _crDragStartList(DRAG) {
  return function (_ref, ev) {
    var groupCaption = _ref.groupCaption,
        caption = _ref.caption;
    this.dragStartWithDnDStyle(ev, [DRAG.GROUP, DRAG.LIST]);

    _fnDnD["default"].setTransferTo({
      event: ev,
      dragId: groupCaption + ";" + caption,
      xType: DRAG.LIST
    });
  };
};

var _crDropList = function _crDropList(DRAG, WatchActions) {
  return function (_ref2, ev) {
    var groupCaption = _ref2.groupCaption,
        caption = _ref2.caption;
    this.dropWithDnDStyle(ev); //ev.currentTarget.style.borderLeft = "";

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
  };
};

var _crDragEnterList = function _crDragEnterList(DRAG) {
  return function (ev) {
    ev.preventDefault();
    this.dragEnterWithDnDStyle(ev, DRAG.LIST, DRAG.C_LIST_ENTER);
  };
};

var _hDragOverList = function _hDragOverList(ev) {
  ev.preventDefault();
};

var _hDragLeaveList = function _hDragLeaveList(ev) {
  ev.preventDefault();
  this.dragLeaveWithDnDStyle(ev);
};

var _bindDnDList = function _bindDnDList(DRAG, WatchActions) {
  Object.assign(this, {
    _hDragStartList: _crDragStartList(DRAG).bind(this),
    _hDropList: _crDropList(DRAG, WatchActions).bind(this),
    _hDragEnterList: _crDragEnterList(DRAG).bind(this),
    _hDragOverList: _hDragOverList,
    _hDragLeaveList: _hDragLeaveList.bind(this)
  });
};

var withDnDList = function withDnDList(target) {
  Object.assign(target.prototype, {
    _bindDnDList: _bindDnDList
  });
};

var _default = withDnDList;
exports["default"] = _default;
//# sourceMappingURL=withDnDList.js.map