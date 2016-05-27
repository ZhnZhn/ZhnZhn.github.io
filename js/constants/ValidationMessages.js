'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var ValidationMessages = {
  WATCH_SAVED: 'Watch List has been saved.',
  WATCH_PREV: 'Watch List has not been edited\nfrom previous save.',

  NOT_FOUND_ITEM: function NOT_FOUND_ITEM(itemType, captionGroup) {
    return 'The ' + itemType + ' witn name ' + captionGroup + ' not found.';
  },
  GROUP_EXISTED: function GROUP_EXISTED(caption) {
    return 'Group with name ' + caption + ' is already existed.';
  },
  LIST_EXISTED: function LIST_EXISTED(captionList, captionGroup) {
    return 'List with name ' + captionList + '\n      In Group ' + captionGroup + ' is already existed.';
  },
  ITEM_EXISTED: function ITEM_EXISTED(caption, captionList) {
    return 'Item with name ' + caption + '\n      In List ' + captionList + ' is already existed.';
  },

  IS_EMPTY_NAME: function IS_EMPTY_NAME(item) {
    return item + ' name can not be empty.';
  },
  NOT_SELECTED: function NOT_SELECTED(item) {
    return item + ' is not selected.';
  },

  NOT_VALID_FORMAT: function NOT_VALID_FORMAT(item) {
    return item + ' is not in valid format.';
  }
};

exports.default = ValidationMessages;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\constants\ValidationMessages.js.map