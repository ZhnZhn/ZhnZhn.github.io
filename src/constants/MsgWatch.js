
const MsgWatch = {
  WATCH_SAVED: 'Watch List has been saved.',
  WATCH_PREV: 'Watch List has not been edited\nfrom previous save.',

  notFoundItem: (itemType, captionGroup) => `The ${itemType} witn name ${captionGroup} not found.`,
  groupExisted: (caption) => `Group with name ${caption} is already existed.`,
  listExisted: (captionList, captionGroup) => `List with name ${captionList}\n      In Group ${captionGroup} is already existed.`,
  itemExisted: (caption, captionList) => `Item with name ${caption}\n      In List ${captionList} is already existed.`,

  emptyName: (item) => `${item} name can not be empty.`,
  notSelected: (item) => `${item} is not selected.`,

  ALERT_DND_ITEM: {
     alertCaption: 'Drag Drop Item',
     alertDescr: 'Item in List already has been existed.'
  },
  ALERT_DND_LIST: {
     alertCaption: 'Drag Drop List',
     alertDescr: 'List in Group already has been existed.'
  }
};

export default MsgWatch
