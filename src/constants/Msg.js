
const Msg = {
  WATCH_SAVED : 'Watch List has been saved.',
  WATCH_PREV : 'Watch List has not been edited\nfrom previous save.',

  NOT_FOUND_ITEM : (itemType, captionGroup) => `The ${itemType} witn name ${captionGroup} not found.`,
  GROUP_EXISTED : (caption) => `Group with name ${caption} is already existed.`,
  LIST_EXISTED : (captionList, captionGroup) => `List with name ${captionList}\n      In Group ${captionGroup} is already existed.`,
  ITEM_EXISTED : (caption, captionList) => `Item with name ${caption}\n      In List ${captionList} is already existed.`,

  IS_EMPTY_NAME : (item) => `${item} name can not be empty.`,
  NOT_SELECTED : (item) => `${item} is not selected.`,

  NOT_VALID_FORMAT : (item) => `${item} is not in valid format.`,
  TEST_DATE_OR_EMPTY : "YYYY-MM-DD format must be OR Empty",

  Alert : {
     ALREADY_EXIST : {
        caption : 'Check Error',
        descr: 'The chart for this code has already existed in a container. Please close it and load again.'
     },
     RUNTIME_ERROR : {
        caption : 'Runtime Error'
     },
     NETWORK_ERROR : {
        caption : 'Network Error',
        descr: 'Network error is encountered. Failed to fetch. It seems you offline or maybe a DNS lookup failure.'
     }
  }
}

export default Msg
