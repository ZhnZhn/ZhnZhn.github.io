'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _LogicFn = require('./LogicFn');

var _LogicFn2 = _interopRequireDefault(_LogicFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var crMsgNotFound = _LogicFn2.default.crMsgNotFound,
    crMsgListExisted = _LogicFn2.default.crMsgListExisted,
    findGroup = _LogicFn2.default.findGroup,
    isInArraySameCaption = _LogicFn2.default.isInArraySameCaption,
    getArrayWithObj = _LogicFn2.default.getArrayWithObj,
    findIndex = _LogicFn2.default.findIndex,
    getArrayWithRename = _LogicFn2.default.getArrayWithRename,
    filter = _LogicFn2.default.filter;


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

    groupTo.lists = getArrayWithObj(lists, { caption: captionList });
    return { isDone: true };
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
    return { isDone: true };
  },
  deleteList: function deleteList(watchList, _ref3) {
    var captionGroup = _ref3.captionGroup,
        captionList = _ref3.captionList;

    var groupFrom = findGroup(watchList, captionGroup);

    if (!groupFrom) {
      return crMsgNotFound('group', captionGroup);
    }

    groupFrom.lists = filter(groupFrom.lists, captionList);
    return { isDone: true };
  }
};

exports.default = WithLogicList;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\watch-list\WithLogicList.js.map