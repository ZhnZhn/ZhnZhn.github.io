"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _LogicFn = _interopRequireDefault(require("./LogicFn"));

var crMsgNotFound = _LogicFn["default"].crMsgNotFound,
    crMsgListExisted = _LogicFn["default"].crMsgListExisted,
    findGroup = _LogicFn["default"].findGroup,
    isInArraySameCaption = _LogicFn["default"].isInArraySameCaption,
    getArrayWithObj = _LogicFn["default"].getArrayWithObj,
    findIndex = _LogicFn["default"].findIndex,
    getArrayWithRename = _LogicFn["default"].getArrayWithRename,
    filter = _LogicFn["default"].filter;
var WithLogicList = {
  createList: function createList(watchList, _ref) {
    var captionGroup = _ref.captionGroup,
        captionList = _ref.captionList;
    var groupTo = findGroup(watchList, captionGroup);

    if (!groupTo) {
      return crMsgNotFound('group', captionGroup);
    }

    var lists = groupTo.lists;

    if (isInArraySameCaption(lists, captionList)) {
      return crMsgListExisted(captionList, captionGroup);
    }

    groupTo.lists = getArrayWithObj(lists, {
      caption: captionList
    });
    return {
      isDone: true
    };
  },
  renameList: function renameList(watchList, _ref2) {
    var captionGroup = _ref2.captionGroup,
        captionListFrom = _ref2.captionListFrom,
        captionListTo = _ref2.captionListTo;
    var groupIn = findGroup(watchList, captionGroup);

    if (!groupIn) {
      return crMsgNotFound('group', captionGroup);
    }

    var lists = groupIn.lists;
    var listIndex = findIndex(lists, captionListFrom);

    if (listIndex === -1) {
      return crMsgNotFound('list', captionListFrom);
    }

    if (isInArraySameCaption(lists, captionListTo)) {
      return crMsgListExisted(captionListTo, captionGroup);
    }

    groupIn.lists = getArrayWithRename(lists, listIndex, captionListTo);
    return {
      isDone: true
    };
  },
  deleteList: function deleteList(watchList, _ref3) {
    var captionGroup = _ref3.captionGroup,
        captionList = _ref3.captionList;
    var groupFrom = findGroup(watchList, captionGroup);

    if (!groupFrom) {
      return crMsgNotFound('group', captionGroup);
    }

    groupFrom.lists = filter(groupFrom.lists, captionList);
    return {
      isDone: true
    };
  }
};
var _default = WithLogicList;
exports["default"] = _default;
//# sourceMappingURL=WithLogicList.js.map