"use strict";

exports.__esModule = true;
exports.dragDropList = exports.dragDropItem = exports.dragDropGroup = void 0;
var _LogicFn = require("./LogicFn");
const dragDropItem = (watchList, _ref) => {
  let {
    dragId,
    dropId
  } = _ref;
  const dragArr = dragId.split(';'),
    dragGroup = (0, _LogicFn.findGroup)(watchList, dragArr[0]),
    dragList = (0, _LogicFn.findList)(dragGroup, dragArr[1]),
    dragIndex = (0, _LogicFn.findIndex)(dragList.items, dragArr[2]),
    dragItem = dragList.items[dragIndex];
  const dropArr = dropId.split(';'),
    dropGroup = (0, _LogicFn.findGroup)(watchList, dropArr[0]),
    dropList = (0, _LogicFn.findList)(dropGroup, dropArr[1]),
    dropIndex = dropArr[2] ? (0, _LogicFn.findIndex)(dropList.items, dropArr[2]) : 0;

  //dragArr[3] => dragArr[2]
  if (dragList.caption !== dropList.caption && (0, _LogicFn.isInArraySameCaption)(dropList.items, dragArr[2])) {
    return (0, _LogicFn.crAlertItemExisted)(dropArr[1], dragArr[2]);
  }
  dragList.items = (0, _LogicFn.filter)(dragList.items, dragArr[2]);
  dropList.items = (0, _LogicFn.insertItemInArray)(dragItem, dropIndex, dropList.items);
  return {
    isDone: true
  };
};
exports.dragDropItem = dragDropItem;
const dragDropList = (watchList, _ref2) => {
  let {
    dragId,
    dropId
  } = _ref2;
  const [dragGroupCaption, dragListCaption] = dragId.split(';'),
    dragGroup = (0, _LogicFn.findGroup)(watchList, dragGroupCaption),
    dragList = (0, _LogicFn.findList)(dragGroup, dragListCaption);
  const [dropGroupCaption, dropListCaption] = dropId.split(';'),
    dropGroup = (0, _LogicFn.findGroup)(watchList, dropGroupCaption),
    dropIndex = dropListCaption ? (0, _LogicFn.findIndex)(dropGroup.lists, dropListCaption) : 0;
  if (dragGroup.caption !== dropGroup.caption && (0, _LogicFn.isInArraySameCaption)(dropGroup.lists, dragListCaption)) {
    return (0, _LogicFn.crAlertListExisted)(dropGroupCaption, dragListCaption);
  }
  dragGroup.lists = (0, _LogicFn.filter)(dragGroup.lists, dragListCaption);
  dropGroup.lists = (0, _LogicFn.insertItemInArray)(dragList, dropIndex, dropGroup.lists);
  return {
    isDone: true
  };
};
exports.dragDropList = dragDropList;
const dragDropGroup = (watchList, _ref3) => {
  let {
    dragId,
    dropId
  } = _ref3;
  const [dragGroupCaption] = dragId.split(';'),
    dragGroup = (0, _LogicFn.findGroup)(watchList, dragGroupCaption),
    [dropGroupCaption] = dropId.split(';'),
    dropIndex = dropGroupCaption ? (0, _LogicFn.findIndex)(watchList.groups, dropGroupCaption) : 0;
  watchList.groups = (0, _LogicFn.filter)(watchList.groups, dragGroupCaption);
  watchList.groups = (0, _LogicFn.insertItemInArray)(dragGroup, dropIndex, watchList.groups);
  return {
    isDone: true
  };
};
exports.dragDropGroup = dragDropGroup;
//# sourceMappingURL=DragDropFn.js.map