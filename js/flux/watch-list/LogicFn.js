'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _MsgWatch = require('../../constants/MsgWatch');

var _MsgWatch2 = _interopRequireDefault(_MsgWatch);

var _fnUtil = require('../../utils/fnUtil');

var _fnUtil2 = _interopRequireDefault(_fnUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var notFoundItem = _MsgWatch2.default.notFoundItem,
    groupExisted = _MsgWatch2.default.groupExisted,
    listExisted = _MsgWatch2.default.listExisted,
    itemExisted = _MsgWatch2.default.itemExisted,
    ALERT_DND_LIST = _MsgWatch2.default.ALERT_DND_LIST,
    ALERT_DND_ITEM = _MsgWatch2.default.ALERT_DND_ITEM;


var CAPTION = 'caption',
    GROUPS = 'groups',
    LISTS = 'lists';

var LogicFn = {
  crMsgNotFound: function crMsgNotFound(itemType, name) {
    return {
      isDone: false,
      message: notFoundItem(itemType, name)
    };
  },
  crMsgGroupExisted: function crMsgGroupExisted(caption) {
    return {
      isDone: false,
      message: groupExisted(caption)
    };
  },
  crMsgListExisted: function crMsgListExisted(captionList, captionGroup) {
    return {
      isDone: false,
      message: listExisted(captionList, captionGroup)
    };
  },
  crMsgItemExisted: function crMsgItemExisted(caption, captionList) {
    return {
      isDone: false,
      message: itemExisted(caption, captionList)
    };
  },


  /* for DragDrop */
  crAlertItemExisted: function crAlertItemExisted(dropId, dragId) {
    return (0, _extends3.default)({
      isDone: false,
      alertItemId: dropId + ':' + dragId
    }, ALERT_DND_ITEM);
  },
  crAlertListExisted: function crAlertListExisted(dropGroupCaption, dragListCaption) {
    return (0, _extends3.default)({
      isDone: false,
      alertItemId: dropGroupCaption + ':' + dragListCaption
    }, ALERT_DND_LIST);
  },

  /* for DragDrop */

  filter: _fnUtil2.default.imArr.filterByPropFn(CAPTION),
  getArrayWithObj: _fnUtil2.default.imArr.push,

  getArrayWithRename: _fnUtil2.default.imArr.editByPropFn(CAPTION),

  /* for DragDrop */
  insertItemInArray: _fnUtil2.default.imArr.insertItem,
  /* for DragDrop */

  findGroup: _fnUtil2.default.obj.findInPropArrayByProp(GROUPS, CAPTION),
  findList: _fnUtil2.default.obj.findInPropArrayByProp(LISTS, CAPTION),

  findIndex: _fnUtil2.default.arr.findIndexByProp('caption'),
  isInArraySameCaption: _fnUtil2.default.arr.isSameByProp(CAPTION)

};

exports.default = LogicFn;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\watch-list\LogicFn.js.map