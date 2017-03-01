'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _LogicFn = require('./LogicFn');

var _LogicFn2 = _interopRequireDefault(_LogicFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WithLogicList = {
  createList: function createList(watchList, _ref) {
    var captionGroup = _ref.captionGroup,
        captionList = _ref.captionList;

    var groupTo = _LogicFn2.default.findGroup(watchList, captionGroup);

    if (!groupTo) {
      return _LogicFn2.default.fResultNotFound('group', captionGroup);
    }
    var lists = groupTo.lists;
    if (_LogicFn2.default.checkIsInArraySameCaption(lists, captionList)) {
      return _LogicFn2.default.fResultListExisted(captionList, captionGroup);
    }

    groupTo.lists = _LogicFn2.default.getArrayWithObj(lists, { caption: captionList });
    return { isDone: true };
  },
  renameList: function renameList(watchList, _ref2) {
    var captionGroup = _ref2.captionGroup,
        captionListFrom = _ref2.captionListFrom,
        captionListTo = _ref2.captionListTo;

    var groupIn = _LogicFn2.default.findGroup(watchList, captionGroup);

    if (!groupIn) {
      return _LogicFn2.default.fResultNotFound('group', captionGroup);
    }
    var lists = groupIn.lists;
    var listIndex = _LogicFn2.default.findIndex(lists, captionListFrom);
    if (listIndex === -1) {
      return _LogicFn2.default.fResultNotFound('list', captionListFrom);
    }
    if (_LogicFn2.default.checkIsInArraySameCaption(lists, captionListTo)) {
      return _LogicFn2.default.fResultListExisted(captionListTo, captionGroup);
    }

    groupIn.lists = _LogicFn2.default.getArrayWithRename(lists, listIndex, captionListTo);
    return { isDone: true };
  },
  deleteList: function deleteList(watchList, _ref3) {
    var captionGroup = _ref3.captionGroup,
        captionList = _ref3.captionList;

    var groupFrom = _LogicFn2.default.findGroup(watchList, captionGroup);

    if (!groupFrom) {
      return _LogicFn2.default.fResultNotFound('group', captionGroup);
    }

    groupFrom.lists = _LogicFn2.default.filter(groupFrom.lists, captionList);
    return { isDone: true };
  }
};

exports.default = WithLogicList;
//# sourceMappingURL=WithLogicList.js.map