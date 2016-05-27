
const ValidationMessages = {
  WATCH_SAVED : 'Watch List has been saved.',
  WATCH_PREV : 'Watch List has not been edited\nfrom previous save.',

  NOT_FOUND_ITEM : (itemType, captionGroup) => `The ${itemType} witn name ${captionGroup} not found.`,
  GROUP_EXISTED : (caption) => `Group with name ${caption} is already existed.`,
  LIST_EXISTED : (captionList, captionGroup) => `List with name ${captionList}\n      In Group ${captionGroup} is already existed.`,
  ITEM_EXISTED : (caption, captionList) => `Item with name ${caption}\n      In List ${captionList} is already existed.`,

  IS_EMPTY_NAME : (item) => `${item} name can not be empty.`,
  NOT_SELECTED : (item) => `${item} is not selected.`,

  NOT_VALID_FORMAT : (item) => `${item} is not in valid format.`
}

export default ValidationMessages
