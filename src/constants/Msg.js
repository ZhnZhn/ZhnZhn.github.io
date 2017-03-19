
const Msg = {
  setAlertMsg : (option, msg) => {
    const {caption, descr} = msg;
    option.alertCaption = caption;
    option.alertDescr = descr;
  },

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
        descr: 'The chart for this code has already existed in a container. Please, close it and load again.'
     },
     LOADING_IN_PROGRESS : {
        caption : 'Loading In Progress Error',
        descr: 'Loading the chart for this item-code in progress.\nIt seems several clicks on button Load repeatedly happend.'
     },
     DOUBLE_LOAD_META : {
       caption : 'Double Load Meta Error',
       descr: 'Meta data for this code already have been loaded.'
     },
     DRAG_DROP_ITEM : {
       caption : 'Drag Drop Item',
       descr : 'Item in List already has been existed.'
     },
     DRAG_DROP_LIST : {
       caption : 'Drag Drop List',
       descr : 'List in Group already has been existed.'
     },
     PREMIUM_WITHOUT_KEY : {
       caption : 'Without Key',
       descr : '403 : Forbidden\n\nYou have attempted to view a premium database in anonymous mode, i.e., without providing a Quandl key. Please register for a free Quandl account, and then include your API key with your requests.'
     },
     RUNTIME_ERROR : {
        caption : 'Runtime Error'
     },
     NETWORK_ERROR : {
        caption : 'Network Error',
        descr: 'Network error is encountered. Failed to fetch. Maybe you are offline, maybe a DNS lookup failure or maybe a data provider does not respond.'
     },
     SERVICE_UNAVAILABLE : {
       caption : 'Service Unavailable 503',
       descr: 'Back-end server is at capacity. HTTP Code 503'
     }
  }
}

export default Msg
