'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var MsgWatch = {
  WATCH_SAVED: 'Watch List has been saved.',
  WATCH_PREV: 'Watch List has not been edited\nfrom previous save.',

  notFoundItem: function notFoundItem(itemType, captionGroup) {
    return 'The ' + itemType + ' witn name ' + captionGroup + ' not found.';
  },
  groupExisted: function groupExisted(caption) {
    return 'Group with name ' + caption + ' is already existed.';
  },
  listExisted: function listExisted(captionList, captionGroup) {
    return 'List with name ' + captionList + '\n      In Group ' + captionGroup + ' is already existed.';
  },
  itemExisted: function itemExisted(caption, captionList) {
    return 'Item with name ' + caption + '\n      In List ' + captionList + ' is already existed.';
  },

  emptyName: function emptyName(item) {
    return item + ' name can not be empty.';
  },
  notSelected: function notSelected(item) {
    return item + ' is not selected.';
  },

  ALERT_DND_ITEM: {
    alertCaption: 'Drag Drop Item',
    alertDescr: 'Item in List already has been existed.'
  },
  ALERT_DND_LIST: {
    alertCaption: 'Drag Drop List',
    alertDescr: 'List in Group already has been existed.'
  }
};

exports.default = MsgWatch;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\constants\MsgWatch.js.map