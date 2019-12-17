"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _LogicFn = _interopRequireDefault(require("./LogicFn"));

var crAlertItemExisted = _LogicFn["default"].crAlertItemExisted,
    crAlertListExisted = _LogicFn["default"].crAlertListExisted,
    findGroup = _LogicFn["default"].findGroup,
    findList = _LogicFn["default"].findList,
    findIndex = _LogicFn["default"].findIndex,
    isInArraySameCaption = _LogicFn["default"].isInArraySameCaption,
    filter = _LogicFn["default"].filter,
    insertItemInArray = _LogicFn["default"].insertItemInArray;
var WithLogicDnD = {
  dragDropItem: function dragDropItem(watchList, _ref) {
    var dragId = _ref.dragId,
        dropId = _ref.dropId;
    var dragArr = dragId.split(';'),
        dragGroup = findGroup(watchList, dragArr[0]),
        dragList = findList(dragGroup, dragArr[1]),
        dragIndex = findIndex(dragList.items, dragArr[2]),
        dragItem = dragList.items[dragIndex];
    var dropArr = dropId.split(';'),
        dropGroup = findGroup(watchList, dropArr[0]),
        dropList = findList(dropGroup, dropArr[1]),
        dropIndex = dropArr[2] ? findIndex(dropList.items, dropArr[2]) : 0; //dragArr[3] => dragArr[2]

    if (dragList.caption !== dropList.caption && isInArraySameCaption(dropList.items, dragArr[2])) {
      return crAlertItemExisted(dropArr[1], dragArr[2]);
    }

    dragList.items = filter(dragList.items, dragArr[2]);
    dropList.items = insertItemInArray(dragItem, dropIndex, dropList.items);
    return {
      isDone: true
    };
  },
  dragDropList: function dragDropList(watchList, _ref2) {
    var dragId = _ref2.dragId,
        dropId = _ref2.dropId;

    var _dragId$split = dragId.split(';'),
        dragGroupCaption = _dragId$split[0],
        dragListCaption = _dragId$split[1],
        dragGroup = findGroup(watchList, dragGroupCaption),
        dragList = findList(dragGroup, dragListCaption);

    var _dropId$split = dropId.split(';'),
        dropGroupCaption = _dropId$split[0],
        dropListCaption = _dropId$split[1],
        dropGroup = findGroup(watchList, dropGroupCaption),
        dropIndex = dropListCaption ? findIndex(dropGroup.lists, dropListCaption) : 0;

    if (dragGroup.caption !== dropGroup.caption && isInArraySameCaption(dropGroup.lists, dragListCaption)) {
      return crAlertListExisted(dropGroupCaption, dragListCaption);
    }

    dragGroup.lists = filter(dragGroup.lists, dragListCaption);
    dropGroup.lists = insertItemInArray(dragList, dropIndex, dropGroup.lists);
    return {
      isDone: true
    };
  },
  dragDropGroup: function dragDropGroup(watchList, _ref3) {
    var dragId = _ref3.dragId,
        dropId = _ref3.dropId;

    var _dragId$split2 = dragId.split(';'),
        dragGroupCaption = _dragId$split2[0],
        dragGroup = findGroup(watchList, dragGroupCaption),
        _dropId$split2 = dropId.split(';'),
        dropGroupCaption = _dropId$split2[0],
        dropIndex = dropGroupCaption ? findIndex(watchList.groups, dropGroupCaption) : 0;

    watchList.groups = filter(watchList.groups, dragGroupCaption);
    watchList.groups = insertItemInArray(dragGroup, dropIndex, watchList.groups);
    return {
      isDone: true
    };
  }
};
var _default = WithLogicDnD;
exports["default"] = _default;
//# sourceMappingURL=WithLogicDnD.js.map