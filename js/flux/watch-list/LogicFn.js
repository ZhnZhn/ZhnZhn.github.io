"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.isInArraySameCaption = exports.insertItemInArray = exports.getArrayWithRename = exports.getArrayWithObj = exports.findList = exports.findIndex = exports.findGroup = exports.filter = exports.crMsgNotFound = exports.crMsgListExisted = exports.crMsgItemExisted = exports.crMsgGroupExisted = exports.crAlertListExisted = exports.crAlertItemExisted = void 0;

var _MsgWatch = require("../../constants/MsgWatch");

var _arrFn = require("../../utils/arrFn");

var _imArrFn = require("../../utils/imArrFn");

var _factoryFindInPropArrayByProp = _interopRequireDefault(require("../../utils/factoryFindInPropArrayByProp"));

const CAPTION = 'caption',
      GROUPS = 'groups',
      LISTS = 'lists';

const _crMsgIsNotDone = message => ({
  isDone: false,
  message
});

const crMsgNotFound = (itemType, name) => _crMsgIsNotDone((0, _MsgWatch.notFoundItem)(itemType, name));

exports.crMsgNotFound = crMsgNotFound;

const crMsgGroupExisted = caption => _crMsgIsNotDone((0, _MsgWatch.groupExisted)(caption));

exports.crMsgGroupExisted = crMsgGroupExisted;

const crMsgListExisted = (captionList, captionGroup) => _crMsgIsNotDone((0, _MsgWatch.listExisted)(captionList, captionGroup));

exports.crMsgListExisted = crMsgListExisted;

const crMsgItemExisted = (caption, captionList) => _crMsgIsNotDone((0, _MsgWatch.itemExisted)(caption, captionList));

exports.crMsgItemExisted = crMsgItemExisted;

const _crAlert = (alertItemId, alertConfig) => ({
  isDone: false,
  alertItemId,
  ...alertConfig
});
/* for DragDrop */


const crAlertItemExisted = (dropId, dragId) => _crAlert(dropId + ":" + dragId, _MsgWatch.ALERT_DND_ITEM);

exports.crAlertItemExisted = crAlertItemExisted;

const crAlertListExisted = (dropGroupCaption, dragListCaption) => _crAlert(dropGroupCaption + ":" + dragListCaption, _MsgWatch.ALERT_DND_LIST);
/* for DragDrop */


exports.crAlertListExisted = crAlertListExisted;
const filter = (0, _imArrFn.imArrFactoryFilterByProp)(CAPTION);
exports.filter = filter;
const getArrayWithObj = _imArrFn.imArrPush;
exports.getArrayWithObj = getArrayWithObj;
const getArrayWithRename = (0, _imArrFn.imArrFactoryEditByProp)(CAPTION);
/* for DragDrop */

exports.getArrayWithRename = getArrayWithRename;
const insertItemInArray = _imArrFn.imArrInsertItem;
/* for DragDrop */

exports.insertItemInArray = insertItemInArray;
const findGroup = (0, _factoryFindInPropArrayByProp.default)(GROUPS, CAPTION);
exports.findGroup = findGroup;
const findList = (0, _factoryFindInPropArrayByProp.default)(LISTS, CAPTION);
exports.findList = findList;
const findIndex = (0, _arrFn.arrFactoryFindIndexByProp)('caption');
exports.findIndex = findIndex;
const isInArraySameCaption = (0, _arrFn.arrFactoryIsSameByProp)(CAPTION);
exports.isInArraySameCaption = isInArraySameCaption;
//# sourceMappingURL=LogicFn.js.map