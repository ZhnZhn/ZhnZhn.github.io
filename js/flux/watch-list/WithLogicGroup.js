'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _LogicFn = require('./LogicFn');

var _LogicFn2 = _interopRequireDefault(_LogicFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var crMsgGroupExisted = _LogicFn2.default.crMsgGroupExisted,
    crMsgNotFound = _LogicFn2.default.crMsgNotFound,
    isInArraySameCaption = _LogicFn2.default.isInArraySameCaption,
    getArrayWithObj = _LogicFn2.default.getArrayWithObj,
    findIndex = _LogicFn2.default.findIndex,
    getArrayWithRename = _LogicFn2.default.getArrayWithRename,
    filter = _LogicFn2.default.filter;


var WithLogicGroup = {
  addGroup: function addGroup(watchList, _ref) {
    var caption = _ref.caption;

    var groups = watchList.groups;

    if (isInArraySameCaption(groups, caption)) {
      return crMsgGroupExisted(caption);
    }

    var _captionObj = caption ? { caption: caption } : { caption: "Default" };

    watchList.groups = getArrayWithObj(groups, _captionObj);
    return { isDone: true };
  },
  renameGroup: function renameGroup(watchList, _ref2) {
    var captionFrom = _ref2.captionFrom,
        captionTo = _ref2.captionTo;

    var groups = watchList.groups,
        groupIndex = findIndex(groups, captionFrom);

    if (groupIndex === -1) {
      return crMsgNotFound('group', captionFrom);
    }
    if (isInArraySameCaption(groups, captionTo)) {
      return crMsgGroupExisted(captionTo);
    }

    watchList.groups = getArrayWithRename(groups, groupIndex, captionTo);
    return { isDone: true };
  },
  deleteGroup: function deleteGroup(watchList, _ref3) {
    var caption = _ref3.caption;

    watchList.groups = filter(watchList.groups, caption);
    return { isDone: true };
  }
};

exports.default = WithLogicGroup;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\watch-list\WithLogicGroup.js.map