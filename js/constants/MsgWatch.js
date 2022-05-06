"use strict";

exports.__esModule = true;
exports.notSelected = exports.notFoundItem = exports.listExisted = exports.itemExisted = exports.groupExisted = exports.emptyName = exports.WATCH_SAVED = exports.WATCH_PREV = exports.ALERT_DND_LIST = exports.ALERT_DND_ITEM = void 0;
const WATCH_SAVED = 'Watch List has been saved.';
exports.WATCH_SAVED = WATCH_SAVED;
const WATCH_PREV = 'Watch List has not been edited\nfrom previous save.';
exports.WATCH_PREV = WATCH_PREV;
const _IS_ALREADY_EXISTED_ = 'is already existed.';

const notFoundItem = (itemType, captionGroup) => "The " + itemType + " witn name " + captionGroup + " not found.";

exports.notFoundItem = notFoundItem;

const groupExisted = caption => "Group with name " + caption + " " + _IS_ALREADY_EXISTED_;

exports.groupExisted = groupExisted;

const listExisted = (captionList, captionGroup) => "List with name " + captionList + " in Group " + captionGroup + " " + _IS_ALREADY_EXISTED_;

exports.listExisted = listExisted;

const itemExisted = (caption, captionList) => "Item with name " + caption + " in List " + captionList + " " + _IS_ALREADY_EXISTED_;

exports.itemExisted = itemExisted;

const emptyName = item => item + " name can not be empty.";

exports.emptyName = emptyName;

const notSelected = item => item + " is not selected.";

exports.notSelected = notSelected;

const _crDnDAlertConfig = (caption, descr) => ({
  alertCaption: "Drag Drop " + caption,
  alertDescr: descr + " " + _IS_ALREADY_EXISTED_
});

const ALERT_DND_ITEM = _crDnDAlertConfig('Item', 'Item in List');

exports.ALERT_DND_ITEM = ALERT_DND_ITEM;

const ALERT_DND_LIST = _crDnDAlertConfig('List', 'List in Group');

exports.ALERT_DND_LIST = ALERT_DND_LIST;
//# sourceMappingURL=MsgWatch.js.map